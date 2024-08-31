<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import {usePage, Link} from '@inertiajs/vue3';
import Panel from "@/Components/Panel.vue";
import {ref, onMounted, onBeforeUnmount} from "vue";
import Fraction from "fraction.js";
const {props} = usePage();
const recipe = props.recipe;

const substitutions = ref({})
const showDropdown = ref(false);
const handleClickOutside = (event) => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const ellipsisIcon = document.getElementById('ellipsis-icon');
    if (dropdownMenu && ellipsisIcon && !dropdownMenu.contains(event.target) && !ellipsisIcon.contains(event.target)) {
        showDropdown.value = false;
    }
};

//normalization function for strings to combat case sensitivity, plural forms and extra space.
const normalizeString = (str) => {
    return str.toLowerCase().trim().replace(/s$/, '');
}

const userAllergies = (props.auth.user.allergens || []).map(allergy => normalizeString(allergy));
const recipeIngredients = recipe.ingredients.map(ingredient => normalizeString((ingredient.name)));

const allergens = recipeIngredients.filter(ingredient => userAllergies.includes(ingredient));

// Add event listener for clicks outside of the dropdown

onMounted(() => {
    document.addEventListener('click', handleClickOutside);

    axios.post('https://sea-lion-app-fliok.ondigitalocean.app/suggest_substitutes', {
        ingredients: recipeIngredients,
        allergens: userAllergies
    })
        .then(response => {
            console.log("Received sub:", response.data.substitutes);
            substitutions.value = response.data.substitutes;
        })
        .catch(error => {
            console.error('Error fetching substitutions:', error)
        });
});

// Remove the event listener when the component is unmounted
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const getFractionQuantity = (quantity) => {
    try{
        return new Fraction(quantity).toFraction(true); //convert to fraction
    }catch (error){
        return quantity; //fallback to original if conversion fails
    }
}

</script>

<template>
    <AuthenticatedLayout>
        <div class="mx-6">
            <Panel class="flex flex-col mt-20 p-6 rounded-lg shadow-xl transform transition-transform">
                <div class="font-bold mb-6 flex justify-between mx-4">
                    <h1>{{recipe.title}}</h1>
                    <!--                Edit recipe dropdown -->
                    <div v-if="recipe.user_id === props.auth.user.id" class="relative">
                        <i class="fa-solid fa-ellipsis cursor-pointer" id="ellipsis-icon" @click="showDropdown = !showDropdown"></i>
                        <div id="dropdown-menu" v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                            <Link v-if="recipe.user_id === props.auth.user.id" :href="`/recipes/${recipe.id}/edit`" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                            Recipe</Link>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 font-medium">
                    <div>
                        <div class="flex flex-row justify-center">
                            <img :src="recipe.image_url"  class="rounded-lg shadow-2xl dark:shadow-darkOrange w-1/2" v-if="recipe.image_url" alt="recipe image">
                        </div>
                    </div>
                   <div class="grid grid-rows-1 border-2 border-darkOrange p-4 rounded-lg shadow-md transform transition-transform">
                       <div class="flex flex-col">
                          <div class="grid grid-rows-2 justify-items-center mx-20">

                              <div class="my-auto font-bold text-xl underline">
                                  <h1>Instructions</h1>
                              </div>

                              <div class="container text-center tracking-wide leading-loose">
                                  {{recipe.instruction}}
                              </div>
                          </div>
                       </div>
                   </div>
                </div>
            </Panel>
            <Panel class="flex flex-col mt-8 p-6 rounded-lg shadow-xl transform transition-transform">
                <div class="grid grid-cols-2 flex-shrink mx-12">
                    <div class="flex flex-col flex-shrink">
                        <div class="mx-auto font-bold max-md:text-sm underline mb-4">
                            <h1>Allergies</h1>
                        </div>
                        <div class="flex">
                            <div class="flex flex-wrap gap-2">
                                <span v-for="allergen in allergens" :key="allergen" class="bg-red-500 text-white rounded-2xl px-4 py-2">
                                    {{allergen.charAt(0).toUpperCase() + allergen.slice(1)}}
                                </span>
                                <span v-if="allergens.length === 0">No allergens found.</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 max-md:text-sm max-md:font-thin">
                        <div class="grid grid-rows-1 justify-items-center">
                           <div class="md:font-bold  max-md:text-sm underline">
                               <h1>Ingredients</h1>
                           </div>
                            <ul class="text-center mt-2 space-y-2">
                                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                                    <!-- Conditional rendering based on units-->
                                    <span v-if="['Large', 'Medium', 'Small'].includes(ingredient.pivot.unit)">
                                        {{ getFractionQuantity(ingredient.pivot.quantity) }} {{ getFractionQuantity(ingredient.pivot.unit) }}  {{ getFractionQuantity(ingredient.name) }}
                                    </span>
                                    <span v-else>
                                          {{ getFractionQuantity(ingredient.pivot.quantity) }} {{ getFractionQuantity(ingredient.pivot.unit) }}  {{ getFractionQuantity(ingredient.name) }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                       <div class="container flex-none">
                           <div class=" grid grid-rows-1 text-center flex-none">
                               <ul class=" grid grid-rows-1 grid-flow-col gap-2 text-md space-x-1 flex-none">
                                   <li class="mb-2" v-for="(ingredient, index) in recipe.ingredients" :key="index">
                                    <span v-if="substitutions[normalizeString(ingredient.name)] && substitutions[normalizeString(ingredient.name)].length > 0">
                                        <span class="md:font-bold  max-md:text-sm underline">Substitutes for: {{ingredient.name}}</span>
                                    </span>
                                       <ul class="mt-3 space-y-2">
                                           <li v-for="(sub, subIndex) in substitutions[normalizeString(ingredient.name)]" :key="subIndex">
                                               {{ sub }}
                                           </li>
                                       </ul>
                                   </li>
                               </ul>
                           </div>
                       </div>
                    </div>
                </div>
            </Panel>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>

</style>
