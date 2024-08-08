<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, watch } from "vue";
import { router, usePage, Link } from "@inertiajs/vue3";
import axios from "axios";

import Panel from "@/Components/Panel.vue";
const { props } = usePage();


const categories = ref(props.categories);
const recipes = ref(props.recipes);
const users = ref([]); // store user search results
const searchQuery = ref(props.query || '');
const searchType = ref('recipes'); // Default search type

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

const search = async () => {
    console.log("Searching for:", searchQuery.value); // Log search query
    console.log("Search Type:", searchType.value); // Log search type

    if (searchQuery.value.trim() === '') {
        router.visit('/recipes', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                recipes.value = page.props.recipes;
                users.value = []; // Clear users
                console.log("Recipes after search:", recipes.value); // Log recipes after search
            }
        });
    } else {
        if (searchType.value === 'recipes') {
            router.get('/search', { query: searchQuery.value }, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    recipes.value = page.props.recipes;
                    users.value = []; // Clear users
                    recipes.value.next_page_url = page.props.recipes.next_page_url;
                    console.log("Recipes after search:", recipes.value); // Log recipes after search
                }
            });
        } else if (searchType.value === 'users') {
            try {
                const response = await axios.get(`/search/users?q=${searchQuery.value}`);
                users.value = response.data;
                recipes.value = { data: [] }; // Clear recipes
                console.log("Users after search:", users.value); // Log users after search
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    }
};

//watch for changes to the searchQuery and reload

watch(searchQuery, (newQuery) => {
    if (newQuery.trim() === '') {
        router.visit('/recipes', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                recipes.value = page.props.recipes;
                users.value = []; // Clear users
                console.log("Recipes after clearing search:", recipes.value); // Log recipes after clearing search
            }
        });
    }
});

const navigateToRecipe = (id) => {
    router.get(`/recipes/${id}`);
};

const navigateToCategory = (id) => {
    router.get(`/categories/${id}`);
};

const editRecipe = (id) => {
    router.get(`/recipes/${id}/edit`);
};

const toggleBookmark = async (recipe) => {
    try {
        await axios.post(`/recipes/${recipe.id}/bookmark`);
        recipe.is_bookmarked = !recipe.is_bookmarked;
    } catch (error) {
        console.log('Error bookmarking recipe:', error);
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <div class="w-full p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Middle Panel: Recipe Feed -->
            <div class="col-span-1 md:col-span-2 h-full overflow-y-auto">
                <Panel>
                    <div v-if="recipes.data.length === 0 && searchType.value === 'recipes'" class="bg-red-200 p-4 mb-4 rounded-lg">
                        <p>No recipes found for "{{searchQuery}}".</p>
                    </div>
                    <div v-if="users.length === 0 && searchType.value === 'users'" class="bg-red-200 p-4 mb-4 rounded-lg">
                        <p>No users found for "{{searchQuery}}".</p>
                    </div>
                    <div v-for="recipe in recipes.data" :key="recipe.id" v-if="searchType === 'recipes'" class="bg-green-200 p-4 mb-4 rounded-lg">
                        <div class="flex items-center">
                            <img v-if="recipe.image_url" :src="recipe.image_url" alt="Recipe Image" class="w-40 h-40 rounded-lg mr-4">
                            <div class="flex-1 text-center">
                                <h3 class="text-lg font-bold">{{ recipe.title }}</h3>
                                <p>{{ recipe.description }}</p>
                                <p v-if="recipe.user">Posted by: <Link :href="`/profile/${recipe.user.id}`" class="text-blue-500">{{ recipe.user.name }}</Link></p>
                            </div>
                            <button class="bg-orange-500 text-white py-2 px-4 rounded-lg" @click="navigateToRecipe(recipe.id)">Info</button>
                        </div>
                        <div class="text-right mt-2">
                            <button @click="toggleBookmark(recipe)">
                                <i :class="recipe.is_bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'" class="bookmark-icon ml-12"></i>
                            </button>
                        </div>
                    </div>
                    <div v-for="user in users" :key="user.id" v-if="searchType === 'users'" class="bg-green-200 p-4 mb-4 rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-1 text-center">
                                <h3 class="text-lg font-bold"><Link :href="`/profile/${user.id}`" class="text-blue-500">{{user.name}}</Link></h3>
                            </div>
                        </div>
                    </div>
                   <div v-if="searchType === 'recipes'">
                       <button v-if="recipes.next_page_url" @click="loadMore" class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                           Load More
                       </button>
                   </div>
                </Panel>
            </div>

            <!-- Left Panel Search and Collections -->
            <div class="md:block row-start-1 col-span-1 rounded-lg">
                <Panel>
                    <div class="container bg-green-200 rounded-lg md:mb-8 p-4 row-start-1 md:m-auto">
                        <h2 class="max-md:hidden text-lg font-bold mb-4 text-center">Search</h2>
                        <div class="container text-center">
                            <form @submit.prevent="search" class="max-md:space-x-4">
                                <input type="text" v-model="searchQuery" class="p-2 md:w-full rounded-lg mb-2 max-md:text-center" placeholder="Search for recipe or user">
                                <select v-model="searchType" class="p-2 md:w-full rounded-lg mb-2 max-md:text-center">
                                    <option value="recipes">Recipes</option>
                                    <option value="users">Users</option>
                                </select>
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
    overflow-y: auto;
    max-height: 100vh;
}
</style>
