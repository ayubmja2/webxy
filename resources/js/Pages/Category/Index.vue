<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {ref} from "vue";
import {usePage, Link, router} from "@inertiajs/vue3";
import Panel from "@/Components/Panel.vue";
import axios from "axios";

const {props} = usePage();
const category = ref(props.category);
const recipes = ref(props.recipes);
const showDropdown = ref(false); // Add state to control dropdown visibility
const showRenameModal = ref(false); // Add state to control rename modal visibility
const newTitle = ref(category.value.title); // Add newTitle to hold the new category title

const navigateToRecipe = (id) => {
    router.get(`/recipes/${id}`);
};

const renameCategory = async () => {
    try {
        await axios.patch(`/categories/${category.value.id}`, {title: newTitle.value});
        category.value.title = newTitle.value;
        showDropdown.value = false; // Hide dropdown after renaming
        showRenameModal.value = false; // Hide modal after renaming
    } catch (error) {
        console.error("Error renaming category:", error);
    }
};

const deleteCategory = async () => {
    try {
        await axios.delete(`/categories/${category.value.id}`);
        router.get('/cookbook'); // Navigate to the cookbook page after deletion
        showDropdown.value = false; // Hide dropdown after deleting
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};

const removeRecipe = async (recipe) => {
    try {
        await axios.delete(`/categories/${category.value.id}/recipes/${recipe.id}`);
        recipes.value = recipes.value.filter(r => r.id !== recipe.id);
    } catch (error) {
        console.error("Error removing recipe from category:", error);
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <div class="container mx-auto p-4">
            <Panel>
                <div class="grid grid-cols-3 justify-items-end font-medium mb-8">
                    <h1 class="col-start-2 justify-self-center">{{ category.title }}</h1>
                    <div class="relative">
                        <i class="fa-solid fa-ellipsis cursor-pointer" @click="showDropdown = !showDropdown"></i>
                        <div v-if="showDropdown" class="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20">
                            <button @click="showRenameModal = true"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rename
                            </button>
                            <button @click="deleteCategory"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="container mx-auto">
                        <div>
                            <ul class="flex space-x-1">
                                <li class="flex-shrink-0" v-for="recipe in recipes" :key="recipe.id">
                                    <Panel>
                                        <div class="flex items-center">
                                            <div class="flex flex-col space-y-4">
                                                <div class="flex mx-auto">
                                                    <img v-if="recipe.image_url" :src="recipe.image_url"
                                                         alt="Recipe Image" class="w-40 h-40 rounded-lg">
                                                </div>
                                                <div class="flex-1 text-center">
                                                    <h3 class="text-lg font-bold">{{ recipe.title }}</h3>
                                                </div>
                                                <button class="bg-orange-500 text-white py-2 px-4 rounded-lg"
                                                        @click="navigateToRecipe(recipe.id)">Info
                                                </button>
                                                <button class="bg-red-500 text-white py-2 px-4 rounded-lg"
                                                        @click="removeRecipe(recipe)">Remove
                                                </button>
                                            </div>
                                        </div>
                                    </Panel>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
        <!-- This is the rename Category Modal   -->
        <div v-if="showRenameModal"
             class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full flex justify-center items-center">
            <div class="bg-white rounded-lg p-4 relative">
                <button @click="showRenameModal = false"
                        class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;
                </button>
                <h2 class="text-xl mb-4">Rename Category</h2>
                <form @submit.prevent="renameCategory">
                    <input v-model="newTitle" type="text" class="border p-2 rounded w-full mb-4" required>
                    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Rename</button>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* Add styles if necessary */
</style>
