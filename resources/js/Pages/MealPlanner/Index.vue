<script setup>
import {ref, onMounted, watch} from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Panel from "@/Components/Panel.vue";
import {Link, router} from "@inertiajs/vue3";
import RecipeCard from "@/Components/RecipeCard.vue";
import {debounce} from "@/Utils/Debounce.js";

//Reactive variables
const defaultDay = ref('Friday'); // default day
const selectedDay = ref(localStorage.getItem("selectedDay") || defaultDay.value);
const categories = ref([]); // To hold categories fetched from backend

const selectedCategory = ref(null); // To hold the selected category ID
const searchTerm = ref(''); // To hold the search term entered by the user
const searchResults = ref([]); // To hold the search results
const draggedRecipe = ref(null);


//Meal types structure
const defaultMealPlan = () => [
    {mealType: "Breakfast", recipes: []},
    {mealType: "Lunch", recipes: []},
    {mealType: "Snack", recipes: []},
    {mealType: "Dinner", recipes: []},
];

// Main meal plans object

const mealPlans = ref({
    Sunday: defaultMealPlan(),
    Monday: defaultMealPlan(),
    Tuesday: defaultMealPlan(),
    Wednesday: defaultMealPlan(),
    Thursday: defaultMealPlan(),
    Friday: defaultMealPlan(),
    Saturday: defaultMealPlan(),
});

// Error handling helper
const handleError = (error, message) => {
    console.log(`${message}:`, error)
}
// Fetch Meal Plans and Categories
const fetchMealPlansAndCategories = async () => {
    try {
        const mealResponse = await axios.get("/meal-plans");
        if(mealResponse.data) {
            mealPlans.value = {
                ...mealPlans.value,
                ...mealResponse.data.reduce((acc, plan) => {
                    acc[plan.day] = JSON.parse(plan.meals) || defaultMealPlan();
                    return acc;
                }, {})
            };
        }
        const categoryResponse = await axios.get('/categories');
        categories.value = categoryResponse.data;
    }catch (error){
        handleError(error, 'Failed to load meal plans or categories')
    }
};
// run on component mount
onMounted(fetchMealPlansAndCategories);

const changeDay = (day) => {
    selectedDay.value = day;
    // mealPlans.value = { ...mealPlans.value }; // Force reactivity to update UI
    localStorage.setItem('selectedDay', day);
};


// Drag and drop handlers
const onDragStart = (recipe) => {
    draggedRecipe.value = recipe;
};

const allowDrop = (event) => {
    event.preventDefault(); //Necessary to allow dropping
};

const onDrop = async (meal) => {
    if (draggedRecipe.value && meal.recipes) {
        meal.recipes.push(draggedRecipe.value);
        draggedRecipe.value = null;
        try {
            await saveMealPlan();
        } catch (error) {
            handleError(error, 'Failed to save meal plan');
        }
    }
};

const removeRecipeFromCategory = async (meal, recipeIndex) => {
    meal.recipes.splice(recipeIndex, 1);
    try {
        await saveMealPlan();
    } catch (error) {
        handleError(error, 'Failed to save meal plan after deletion');
    }
};

// Save meal plans
const saveMealPlan = async () => {
    try {
        await axios.post("/meal-plans", {
            day: selectedDay.value,
            meals: mealPlans.value[selectedDay.value],
        });
    } catch (error) {
        handleError(error, 'Failed to save meal plan');
    }
};


// Delete the entire meal plan for the day
const deleteMealPlan = async () => {
    try {
        await axios.delete('/meal-plans', {
            data: { day: selectedDay.value }
        });
        mealPlans.value[selectedDay.value].forEach(meal => meal.recipes = []);
    } catch (error) {
        handleError(error, 'Failed to delete meal plan');
    }
};

// Debounce search to reduce API calls
const debouncedSearchRecipes = debounce(async () => {
    if (selectedCategory.value && searchTerm.value.trim()) {
        try {
            const response = await axios.post('/recipes/search', {
                category_id: selectedCategory.value,
                search: searchTerm.value
            });
            searchResults.value = response.data;
        } catch (error) {
            handleError(error, 'Failed to search recipes');
        }
    } else {
        searchResults.value = [];
    }
}, 300);

watch(searchTerm, debouncedSearchRecipes); // Watch for changes in search term

// Navigation Handler
const navigateToRecipe = (id) => {
    router.get(`/recipes/${id}`);
};

</script>

<template>
    <AuthenticatedLayout>
        <div class="mx-5 mt-20">
            <div class="grid grid-cols-3 gap-2">
                <!-- Left panel for days of the week -->
                <Panel class="h-lvh">
                    <div class="flex flex-col space-y-4 text-center">
                        <Button
                            v-for="day in ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']"
                            :key="day"
                            @click.prevent="changeDay(day)"
                            class="p-2 px-20 bg-darkOrange/90 rounded-2xl">
                            {{ day }}
                        </Button>
                    </div>
                </Panel>

                <!-- Middle panel for meal categories -->
                <Panel>
                    <div class="container">
                        <div class="flex justify-between mb-4">
                            <h3 class="text-center font-medium">{{ selectedDay }}</h3>
                            <i @click="deleteMealPlan" class="fa-solid fa-trash text-red-600 text-lg cursor-pointer"></i>
                        </div>

                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div
                                v-for="(meal, index) in mealPlans[selectedDay]"
                                :key="index"
                                class="border p-4 rounded-lg bg-gray-100"
                                @dragover="allowDrop"
                                @drop="onDrop(meal)"
                            >
                                <h3>{{ meal.mealType }}</h3>
                                <div v-for="(recipe, i) in meal.recipes" :key="i" class="relative mt-4">
                                    <RecipeCard
                                        class="my-recipe"
                                        :recipe="recipe"
                                        :navigateToRecipe="navigateToRecipe"
                                        :showBookmark="false"
                                        :compact="true"
                                        :showFooter="false"
                                    />
                                    <button
                                        class="absolute top-0 right-0 text-red-700 px-2 py-1"
                                        @click="removeRecipeFromCategory(meal, i)">
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>

                <!-- Right panel for recipe search -->
                <Panel>
                    <div class="container">
                        <select v-model="selectedCategory" class="w-full p-2 rounded border text-black">
                            <option disabled :value="null">Select a Category</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.title }}
                            </option>
                        </select>

                        <input
                            type="text"
                            v-model="searchTerm"
                            placeholder="Search Recipes"
                            class="w-full p-2 mt-4 rounded border"
                        />

                        <div class="flex justify-evenly">
                            <ul v-if="searchResults.length > 0" class="mt-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                                <li
                                    v-for="recipe in searchResults"
                                    :key="recipe.id"
                                    class="p-2 mb-2 flex flex-col"
                                    draggable="true"
                                    @dragstart="onDragStart(recipe)"
                                >
                                    <RecipeCard
                                        class="my-recipe"
                                        :recipe="recipe"
                                        :navigateToRecipe="navigateToRecipe"
                                        :showBookmark="false"
                                        :compact="true"
                                        :showFooter="false"
                                    />
                                </li>
                            </ul>
                            <p v-else>No recipes found</p>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.my-recipe {
    max-width: 300px;
    max-height: 100px;
}
</style>
