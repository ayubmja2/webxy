<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {ref, onMounted} from "vue";
import {router, usePage, Link} from "@inertiajs/vue3";
import Panel from "@/Components/Panel.vue";
import RecipeCard from "@/Components/RecipeCard.vue";

const {props} = usePage();


// Categories, Recipes, and uncategorized bookmarks data from the backend
const categories = ref(props.categories);
const recipes = ref(props.recipes);

const bookmarkedRecipes = ref(Array.isArray(props.bookmarkedRecipes) ? props.bookmarkedRecipes : []);
// Form data for creating a new category
const newCategoryTitle = ref('');

// Function to handle creating a new category
const createCategory = async () => {
    try {
        const response = await axios.post('/cookbook', {
            title: newCategoryTitle.value,
        });

        const newCategory = response.data.category;
        categories.value.push(newCategory); // Add the new category to the frontend state
        newCategoryTitle.value = '';
    } catch (error) {
        console.error('Error creating category:', error);
    }
};

// Function to handle dragging a bookmark to a category
const dragBookmark = (event, bookmarkId) => {
    event.dataTransfer.setData('bookmarkId', bookmarkId);
};

// Function to handle dropping a bookmark in a category
const dropBookmark = async(event, categoryId) => {
    event.preventDefault();

    const bookmarkId = event.dataTransfer.getData('bookmarkId');
    await router.post(`/categories/${categoryId}/bookmarks`, {
        bookmarkId: bookmarkId,
    }, {
        onSuccess: () => {
            const updatedBookmarks = bookmarkedRecipes.value.filter(bookmark => bookmark.id !== parseInt(bookmarkId));
            bookmarkedRecipes.value = updatedBookmarks;
        },
    });
};

// Prevent default behavior when dragging over the category
const allowDrop = (event) => {
    event.preventDefault();
};

const navigateToRecipe = (id) => {
    router.get(`/recipes/${id}`);
};

const toggleBookmark = async (recipe) => {
    try {
        // API call to toggle bookmark
        const response = await axios.post(`/recipes/${recipe.id}/bookmark`);

        // Update the local state based on the response
        recipe.is_bookmarked = response.data.is_bookmarked;

        // Reflect the state in the UI
        if (!recipe.is_bookmarked) {
            bookmarkedRecipes.value = bookmarkedRecipes.value.filter(bookmark => bookmark.id !== recipe.id);
        } else {
            // If it's bookmarked, ensure it appears in the bookmarkedRecipes
            if (!bookmarkedRecipes.value.some(bookmark => bookmark.id === recipe.id)) {
                bookmarkedRecipes.value.push(recipe);
            }
        }
    } catch (error) {
        console.log('Error bookmarking recipe:', error);
    }
};

onMounted(() => {
    const horizontalScrollContainers = document.querySelectorAll('.overflow-x-auto');
    horizontalScrollContainers.forEach(container => {
        container.addEventListener('wheel', function (e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        });
    });
});
</script>

<template>
    <AuthenticatedLayout>
        <div class="container mx-auto m-4 px-4 mt-20">
            <!-- Form For creating categories -->
            <Panel>
                <div class="flex flex-col">
                    <div class="text-center">
                        <form @submit.prevent="createCategory">
                            <input type="text" class="rounded-2xl opacity-50 mr-4" v-model="newCategoryTitle" placeholder="New Category"/>
                            <button class="bg-darkOrange text-mintGreen max-sm:mt-2 md:ml-4 rounded-2xl p-2 px-4 shadow dark:shadow-amber-500" type="submit">New Category</button>
                        </form>
                    </div>
                </div>
            </Panel>

            <!-- Category section -->
            <div class="grid grid-cols-2 m-4 gap-2">
                <Panel>
                    <div class="flex flex-col space-y-2 text-center">
                        <div class="font-medium  mb-4">
                            <h1>New Categories</h1>
                        </div>
                        <ul class="flex flex-wrap justify-evenly max-sm:flex-col text-center">
                            <li v-for="category in categories"
                                class="p-2 bg-darkOrange text-mintGreen rounded-lg shadow"
                                :key="category.id"
                                @dragover="allowDrop"
                                @drop="(event) => dropBookmark(event,category.id)">
                                <Link :href="`/categories/${category.id}`">{{ category.title }}</Link>
                            </li>
                        </ul>
                    </div>
                </Panel>

                <Panel>
                    <div class="container mx-auto">
                        <div class="text-center mb-4 font-medium">
                            <h1>New BookMarks</h1>
                        </div>
                        <div class="container mx-auto">
                            <div class="h-80 overflow-y-scroll hide-scrollbar">
                                <ul class="flex flex-col space-y-2">
                                    <li v-for="bookmark in bookmarkedRecipes" :key="bookmark.id" draggable="true" @dragstart="(event) => dragBookmark(event, bookmark.id)"
                                        class="p-2 rounded-lg">
                                           <RecipeCard :recipe="bookmark" :isBookmarked="bookmark.is_bookmarked" :navigateToRecipe="navigateToRecipe" :toggleBookmark="toggleBookmark" :iconCompact="true" :showSocialIcons="false"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Panel>
                <div class="container mx-auto col-span-2">
                    <Panel>
                        <div class="text-center text-md mb-4 font-medium">
                            <h1>My Recipes</h1>
                        </div>
                        <div class="container mx-auto">
                            <div class="h-40 overflow-x-auto hide-scrollbar">
                                <ul class="flex space-x-4">
                                    <li class="flex-shrink-0" v-for="recipe in recipes" :key="recipe.id">
                                        <RecipeCard class="my-recipe" :recipe="recipe"  :navigateToRecipe="navigateToRecipe" :toggleBookmark="toggleBookmark"  :compact="true" :showFooter="false"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
@media(max-width: 768px){
    .grid{
        grid-template-columns: 1fr;
    }
}
.hide-scrollbar::-webkit-scrollbar {
    display:none;
}
.hide-scrollbar{
    -ms-overflow-style:none;
    scrollbar-width:none;
}
.overflow-x-auto {
    display: flex;
    overflow-x:auto;
    white-space: nowrap
}
.overflow-x-auto li{
    display: inline-block;
}
.my-recipe{
    max-width: 300px;
    max-height: 100px;
}
</style>
