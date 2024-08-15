<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {usePage, Link} from '@inertiajs/vue3';
import Panel from "@/Components/Panel.vue";
import {ref, onMounted, onBeforeUnmount} from "vue";

const {props} = usePage();
const recipe = props.recipe;

const showDropdown = ref(false);
const handleClickOutside = (event) => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const ellipsisIcon = document.getElementById('ellipsis-icon');
    if (dropdownMenu && ellipsisIcon && !dropdownMenu.contains(event.target) && !ellipsisIcon.contains(event.target)) {
        showDropdown.value = false;
    }
};
// Add event listener for clicks outside of the dropdown
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// Remove the event listener when the component is unmounted
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
//normalization function for strings to combat case sensitivity, plural forms and extra space.
const normalizeString = (str) => {
    return str.toLowerCase().trim().replace(/s$/, '');
}

const userAllergies = (props.auth.user.allergens || []).map(allergy => normalizeString(allergy));
const recipeIngredients = recipe.ingredients.map(ingredient => normalizeString((ingredient.name)));

const allergens = recipeIngredients.filter(ingredient => userAllergies.includes(ingredient));
</script>

<template>
    <AuthenticatedLayout>
        <div class="container mx-auto">
            <Panel class="flex flex-col mt-6">
                <div class="grid grid-cols-3 justify-items-end font-medium mb-8">

                    <!-- Edit Recipe Link moved to the dropdown -->
                    <h1 class="col-start-2 justify-self-center">{{ recipe.title }}</h1>

                    <div  v-if="recipe.user_id === props.auth.user.id" class="relative">
                        <i class="fa-solid fa-ellipsis cursor-pointer" id="ellipsis-icon" @click="showDropdown = !showDropdown"></i>
                        <div id="dropdown-menu"
                             v-show="showDropdown"
                             class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                            <Link v-if="recipe.user_id === props.auth.user.id" :href="`/recipes/${recipe.id}/edit`" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Recipe</Link>
                        </div>
                    </div>

                </div>
                <div class="container mx-auto mb-8">
                    <div class="flex flex-row justify-evenly">
                        <img class="rounded-lg shadow-2xl dark:shadow-orange-500 mb-4 h-60 w-60" v-if="recipe.image_url"
                             :src="recipe.image_url" alt="">
                    </div>
                </div>

                <div class="grid grid-cols-2 text-center gap-4 mb-8">
                    <div>
                        <Panel>
                            <h1>Instructions</h1>
                            <h2 class="mt-4">{{ recipe.instruction }}</h2>
                        </Panel>
                    </div>
                    <div>
                        <Panel>
                            <h1>Ingredients</h1>
                            <ul class="mt-4">
                                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                                    <!-- Conditional rendering based on units-->
                                    <span v-if="['Large', 'Medium', 'Small'].includes(ingredient.pivot.unit)">
                                        {{ ingredient.pivot.quantity }} {{ ingredient.pivot.unit }}  {{ ingredient.name }}
                                    </span>
                                    <span v-else>
                                         {{ ingredient.pivot.quantity }} {{ ingredient.pivot.unit }} of {{ ingredient.name }}
                                    </span>
                                </li>
                            </ul>
                        </Panel>
                    </div>
                </div>

                <!--  Where users allergies will be highlighted for them if it exists  -->
                <div class="text-center font-medium">
                    <Panel>
                        <h1>Allergens</h1>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="allergen in allergens" :key="allergen"
                                  class="bg-red-500 text-white rounded-2xl px-4 py-2">
                                 {{ allergen.charAt(0).toUpperCase() + allergen.slice(1) }}
                            </span>
                            <span v-if="allergens.length === 0">No allergens found.</span>
                        </div>
                    </Panel>
                </div>
            </Panel>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.container {
    max-width: 800px;
}
</style>
