<script setup>
import {ref, onMounted, watch} from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Panel from "@/Components/Panel.vue";
import {Link, router} from "@inertiajs/vue3";
import RecipeCard from "@/Components/RecipeCard.vue";

const defaultDay = ref('Friday'); // default day
const selectedDay = ref(defaultDay);
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

const mealPlans = ref({
    Sunday: defaultMealPlan(),
    Monday: defaultMealPlan(),
    Tuesday: defaultMealPlan(),
    Wednesday: defaultMealPlan(),
    Thursday: defaultMealPlan(),
    Friday: defaultMealPlan(),
    Saturday: defaultMealPlan(),
});

onMounted(async () => {
    const storedDay = localStorage.getItem("selectedDay");
    if (storedDay) {
        selectedDay.value = storedDay;
    }

    try {
        const response = await axios.get("/meal-plans");
        if (response.data) {
            mealPlans.value = {
                ...mealPlans.value,
                ...response.data.reduce((acc, plan) => {
                    acc[plan.day] = JSON.parse(plan.meals) || [...defaultMealPlan];
                    return acc;
                }, {})
            };
        }
    } catch (error) {
        console.log("Failed to load meal Plans:", error);
    }
});

const changeDay = (day) => {
    selectedDay.value = day;
    mealPlans.value = { ...mealPlans.value }; // Force reactivity to update UI
    localStorage.setItem('selectedDay', day);
};


// Drag handlers
const onDragStart = (recipe) => {
    draggedRecipe.value = recipe;
};

const allowDrop = (event) => {
    event.preventDefault(); //Necessary to allow dropping
};


const onDrop = async (meal) => {
    if (!meal.recipes) {
        meal.recipes = [];
    }

    if (draggedRecipe.value) {
        meal.recipes = [...meal.recipes, draggedRecipe.value]; // Clone and update

        draggedRecipe.value = null;

        // Save the updated meal plan and force Vue to track changes
        mealPlans.value[selectedDay.value] = [...mealPlans.value[selectedDay.value]]; // Force reactivity
        try {
            await axios.post("/meal-plans", {
                day: selectedDay.value,
                meals: mealPlans.value[selectedDay.value],
            });
        } catch (error) {
            console.error("Failed to save meal plan:", error);
        }
    }
};

const removeRecipeFromCategory = (meal, recipeIndex) => {
    if (meal.recipes) {
        // Clone the array before modifying it to trigger Vue reactivity
        meal.recipes = meal.recipes.slice();
        meal.recipes.splice(recipeIndex, 1);

        // Force reactivity after the change
        mealPlans.value = { ...mealPlans.value };

        // Optionally save after deletion
        try {
            axios.post("/meal-plans", {
                day: selectedDay.value,
                meals: mealPlans.value[selectedDay.value]
            });
        } catch (error) {
            console.error("Failed to save meal plan after deletion:", error);
        }
    }
};


// Add meal boxes (fallback to ensure there are meal types)
const addMealBoxes = async () => {
    if (!mealPlans.value[selectedDay.value] || mealPlans.value[selectedDay.value].length === 0) {
        mealPlans.value[selectedDay.value] = [...defaultMealPlan];

        try {
            await axios.post("/meal-plans", {
                day: selectedDay.value,
                meals: mealPlans.value[selectedDay.value],
            });
        } catch (error) {
            console.error("Failed to save meal plan:", error);
        }
    }
};

const deleteMealPlan = async () => {
    try {
        // Make DELETE request to the server
        await axios.delete('/meal-plans', {
            data: {
                day: selectedDay.value
            }
        });

        // Immediately update the local state to remove the meal plan
        mealPlans.value[selectedDay.value].forEach(meal => {
            meal.recipes = [];  // Clear all recipes for each meal type
        });

        // Optionally show a success message or feedback to the user
        console.log("Meal plan deleted successfully");
    } catch (error) {
        console.error("Failed to delete meal plan:", error);
    }
};

// Load categories for the right-side panel
onMounted(async () => {
    try {
        const response = await axios.get('/categories');
        categories.value = response.data;
    } catch (error) {
        console.log('Failed to load categories:', error);
    }
});


const searchRecipes = async () => {
    if(selectedCategory.value) {
        try{
            const response = await axios.post('/recipes/search', {
                category_id: selectedCategory.value,
                search: searchTerm.value
            });
            if(!searchTerm.value){
                searchResults.value = []
            }else {
                searchResults.value = response.data;
            }
        }catch(error) {
            console.log('Failed to search recipes:', error);
        }
    }
}
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
                  <div class="flex flex-col space-y-4">
                     <div class="flex flex-col text-center font-medium text-2xl text-mintGreen space-y-4 mx-auto">
                         <Button @click.prevent="changeDay('Sunday')" class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Sunday</Button>
                         <Button @click.prevent="changeDay('Monday')" class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Monday</Button>
                         <Button @click.prevent="changeDay('Tuesday')" class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Tuesday</Button>
                         <Button @click.prevent="changeDay('Wednesday')" class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Wednesday</Button>
                         <Button @click.prevent="changeDay('Thursday')" class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Thursday</Button>
                         <Button @click.prevent="changeDay('Friday')" class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Friday</Button>
                         <Button @click.prevent="changeDay('Saturday')" class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Saturday</Button>
                     </div>
                  </div>
              </Panel>
            <!-- Middle panel for meal categories (Breakfast, Lunch, Snack, Dinner  -->
              <Panel>
                  <div class="container">
                     <div class="flex flex-col">
                         <div class="grid grid-rows-1">
                            <div class="grid grid-cols-3">
                                <div class="col-start-2 font-medium text-center">
                                   {{selectedDay}}
                                </div>
                                <div class="col-start-3 justify-self-end space-x-4">
                                    <i @click="deleteMealPlan" class="fa-solid fa-trash my-auto text-red-600 text-lg"></i>
                                </div>
                            </div>
                         </div>
                         <!-- Meal categories (droppable zones) -->
                         <div class="grid grid-cols-2 gap-4 mt-4">
                             <div
                                 v-for="(meal, index) in mealPlans[selectedDay]"
                                 :key="index"
                                 class="border p-4 rounded-lg bg-gray-100"
                                 @dragover="allowDrop"
                                 @drop="onDrop(meal)"
                             >
                                 <h3>{{ meal.mealType }}</h3>

                                 <!-- List the recipes inside the meal -->
                                 <div v-for="(recipe, i) in meal.recipes" :key="i" class="relative mt-4">
                                     <RecipeCard
                                         class="my-recipe"
                                         :recipe="recipe"
                                         :navigateToRecipe="navigateToRecipe"
                                         :showBookmark="false"
                                         :compact="true"
                                         :showFooter="false"
                                     />
                                     <!-- Red "x" button to remove the recipe -->
                                     <button
                                         class="absolute top-0 right-0 text-red-700 bg-transparent px-2 py-1"
                                         @click="removeRecipeFromCategory(meal, i)"
                                     >
                                         X
                                     </button>
                                 </div>
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
                          @input="searchRecipes"
                          placeholder="Search Recipes"
                          class="w-full p-2 mt-4 rounded border"
                      />

                      <!-- Render search results with drag-and-drop functionality -->
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
                          <p v-else-if="selectedCategory !== ''">No recipes found</p>
                      </div>
                  </div>
              </Panel>
          </div>
      </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.my-recipe{
    max-width: 300px;
    max-height: 100px;
}
</style>
