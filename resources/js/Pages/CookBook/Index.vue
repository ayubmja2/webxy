<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {ref} from "vue";
import {router, usePage, Link} from "@inertiajs/vue3";
import Panel from "@/Components/Panel.vue";

const {props} = usePage();
//Categories, Recipes, and uncategorized bookmarks data from the backend

const categories = ref(props.categories);
const recipes = ref(props.recipes);
const uncategorizedBookmarks = ref(props.uncategorizedBookmarks);

//Form data for creating a new category
const newCategoryTitle = ref('');

//Function to handle creating a new category

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

// function to handle dragging a bookmark to a category
const dragBookmark = (event, bookmarkId) => {
    event.dataTransfer.setData('bookmarkId', bookmarkId);
};

// Function to handle dropping a bookmark in a category
const dropBookmark = async(event, categoryId) => {
    const bookmarkId = event.dataTransfer.getData('bookmarkId');
    await router.post(`/categories/${categoryId}/bookmarks`, {
        bookmarkId: bookmarkId,
    }, {
        onSuccess: () => {
            uncategorizedBookmarks.value = uncategorizedBookmarks.value.filter(bookmark => bookmark.id != bookmarkId);
        },
    });
};

</script>

<template>
    <AuthenticatedLayout>
        <div class="container mx-auto m-4 px-4 mt-20">
            <!--   Form For creating categories  -->
           <Panel>
               <div class="flex flex-col">
                   <div class="text-center">
                       <form @submit.prevent="createCategory">
                           <input type="text" class="rounded-2xl opacity-50 mr-4" v-model="newCategoryTitle" placeholder="New Category"/>
                           <button
                               class="bg-orange-400 max-sm:mt-2 md:ml-4 rounded-2xl p-2 px-4 shadow dark:shadow-amber-500"
                               type="submit">New Category
                           </button>
                       </form>
                   </div>
               </div>
           </Panel>

            <!--  Category section  -->
            <div class="grid grid-cols-2 m-4 gap-2">
              <Panel>
                  <div class="flex flex-col space-y-2 text-center">
                      <div>
                          <h1>New Categories</h1>
                      </div>
                      <ul class="flex flex-wrap justify-evenly max-sm:flex-col text-center">
                          <li v-for="category in categories" :key="category.id" class="p-2 bg-gray-200 rounded-lg shadow">
                              <Link :href="`/categories/${category.id}`">{{ category.title }}</Link>
                          </li>
                      </ul>
                  </div>
              </Panel>

                <Panel>
                    <div class="container mx-auto">
                        <div class="text-center mb-4">
                            <h1>New BookMarks</h1>
                        </div>
                        <div class="container mx-auto">
                            <div class="h-80 overflow-y-scroll hide-scrollbar">
                                <ul class="flex flex-col space-y-2">
                                    <!--
                                    This is where uncategorized bookmarks go and get listed here. You can click on them and drag them over
                                    the category the user has created and save them in that category they dropped it there. The uncategorized bookmark that gets
                                    dropped in a category should be removed from the uncategorized section.
                                      -->

                                    <li v-for="bookmark in uncategorizedBookmarks" :key="bookmark.id" draggable="true" @dragstart="(event) => dropBookmark(event, bookmark.id)"
                                        class="-2 bg-gray-200 rounded-lg shadow">
                                        {{ bookmark.title }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Panel>
                <div class="container mx-auto col-span-2">
                    <Panel>
                        <div class="text-center text-md mb-3">
                            <h1>My Recipes</h1>
                        </div>
                        <div class="container mx-auto">
                            <div class="h-80 overflow-x-auto hide-scrollbar">
                                <ul class="flex">
                                    <!--  This is where recipes that the user creates will live. So they have an opportunity to update/view/delete them-->
                                    <li v-for="recipe in recipes" :key="recipe.id" class="p-2 bg-gray-200 rounded-lg shadow">
                                        {{ recipe.title }}
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
</style>
