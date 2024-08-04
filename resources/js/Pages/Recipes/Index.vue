<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, watch } from "vue";
import {router, usePage} from "@inertiajs/vue3";

import RecipeCard from "@/Components/RecipeCard.vue";
import Panel from "@/Components/Panel.vue";
// const props = defineProps({
//     recipes: Object,
//     collections: Array,
//     usePage
// });
const {props} = usePage();
const categories = ref(props.categories);

const recipes = ref(props.recipes);
const searchQuery = ref(props.query || '');

const loadMore = () => {
    if (recipes.value.next_page_url) {
        router.get(recipes.value.next_page_url, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                recipes.value.data = recipes.value.data.concat(page.props.recipes.data);
                recipes.value.next_page_url = page.props.recipes.next_page_url;
                history.replaceState(null, '', `/recipes`);
            }
        });
    }
};

const search = () => {
    if(searchQuery.value.trim() === ''){
        router.visit('/recipes', {
            preserveScroll:true,
            preserveState: true,
            onSuccess: (page) => {
                recipes.value = page.props.recipes;
            }
        });
    }else {
        router.get('/search', {query: searchQuery.value}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                recipes.value = page.props.recipes;
                recipes.value.next_page_url = page.props.recipes.next_page_url;
                history.replaceState(null, '', `/recipes`);
            }
        });
    }
};

//watch for changes to the searchQuery and reload

watch(searchQuery, (newQuery) => {
    if(newQuery.trim() === '') {
        router.visit('/recipes', {
            preserveScroll:true,
            preserveState: true,
            onSuccess: (page) => {
                recipes.value = page.props.recipes;
            }
        })
    }
})
const navigateToRecipe = (id) => {
    router.get(`/recipes/${id}`);
};

const navigateToCategory = (id) => {
    router.get(`/categories/${id}`);
};

const editRecipe = (id) => {
    router.get(`/recipes/${id}/edit`);
};

</script>

<template>
    <AuthenticatedLayout>
        <div class="w-full p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Middle Panel: Recipe Feed -->
            <div class="col-span-1 md:col-span-2 h-full overflow-y-auto">
               <Panel>
                   <div v-if="recipes.data.length === 0" class="bg-red-200 p-4 mb-4 rounded-lg">
                       <p>No recipes found for "{{searchQuery}}".</p>
                   </div>
                   <div v-for="recipe in recipes.data" :key="recipe.id" class="bg-green-200 p-4 mb-4 rounded-lg">
                       <div class="flex items-center">
                           <img v-if="recipe.image_url" :src="recipe.image_url" alt="Recipe Image" class="w-40 h-40 rounded-lg mr-4">
                           <div class="flex-1 text-center">
                               <h3 class="text-lg font-bold">{{ recipe.title }}</h3>
                               <p>{{ recipe.description }}</p>
                           </div>
                           <button class="bg-orange-500 text-white py-2 px-4 rounded-lg" @click="navigateToRecipe(recipe.id)">Info</button>
                       </div>
<!--                       bookmark icon-->
                       <div class="text-right mt-2">
                           <i class="far fa-bookmark bookmark-icon ml-12"></i>
                       </div>
                   </div>
                   <button v-if="recipes.next_page_url" @click="loadMore" class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                       Load More
                   </button>
               </Panel>
            </div>

            <!-- Left Panel Search and Collections -->
            <div class="md:block row-start-1 col-span-1 rounded-lg">
                <Panel>
                    <div class="container bg-green-200 rounded-lg md:mb-8 p-4 row-start-1 md:m-auto">
                        <h2 class="max-md:hidden text-lg font-bold mb-4 text-center">Search</h2>
                        <div class="container text-center">
                            <form @submit.prevent="search" class="max-md:space-x-4">
                                <input type="text" v-model="searchQuery" class="p-2 md:w-full rounded-lg mb-2 max-md:text-center" placeholder="Search for recipe">
                                <button type="submit" class="bg-orange-500 text-white py-2 px-4 rounded-lg md:w-full">Search</button>
                            </form>
                        </div>
                    </div>

                    <div class="hidden md:block row-start-2 bg-green-200 p-4 rounded-lg text-center">
                        <h2 class="text-lg font-bold mb-4">Collections</h2>
                        <div v-for="category in categories" :key="category.id" class="mb-2">
                            <button class="bg-orange-500 text-white py-2 px-4 rounded-xl w-3/4 mb-4" @click="navigateToCategory(category.id)">
                                {{ category.title }}
                            </button>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>

.grid {
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
        grid-template-columns: 1fr 2fr 1fr;
    }
}


.overflow-y-auto {
    overflow-y:auto;
    max-height:100vh;
}
</style>
