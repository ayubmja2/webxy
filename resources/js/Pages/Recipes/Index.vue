<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, watch, onMounted } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import axios from "axios";
import Panel from "@/Components/Panel.vue";
import RecipeCard from "@/Components/RecipeCard.vue";
import UserCard from "@/Components/UserCard.vue";

const { props } = usePage();
const notifications = ref([]);
const newUploads = ref(0);
const searchCompleted = ref(false);
const isSearching = ref(false);
const categories = ref(props.categories);
const recipes = ref(props.recipes);
const users = ref(props.users);
const searchQuery = ref(props.query || '');
const searchType = ref('recipes');
const showFollowing = ref(props.showFollowing);

const fetchUnreadNotifications = async () => {
    try {
        const response = await axios.get('/api/notifications/unread');
        notifications.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

const showNewUploads = async () => {
    try {
        await axios.post('/api/notifications/read');
        notifications.value = [];
        toggleFeed('following');
        newUploads.value = 0;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchUnreadNotifications();

    Echo.private('recipes')
        .listen('RecipeUploaded', (event) => {
            fetchUnreadNotifications();
        }).notification((notification) => {
        notifications.value.push(notification)
        notifications.value = [...notifications.value]
    });
});

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
    } else if (searchType.value === 'users' && users.value.next_page_url) {
        router.get(users.value.next_page_url, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                users.value.data = users.value.data.concat(page.props.users.data);
                users.value.next_page_url = page.props.users.next_page_url;
                history.replaceState(null, '', `/profile`);
            }
        });
    }
};

// Toggle between "All" and "Following" feeds
const toggleFeed = (filter) => {
    const url = filter === 'following' ? '/recipes?filter=following' : '/recipes';
    router.get(url, {}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
            recipes.value = page.props.recipes;
            showFollowing.value = page.props.showFollowing;
        }
    });
};

// Watch for changes to the searchType
watch(searchType, async () => {
    searchQuery.value = '';

    if (searchType.value === 'recipes') {
        await router.visit('/recipes', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                recipes.value = page.props.recipes;
                users.value = { data: [] }; // Clear users
                searchCompleted.value = false;
            }
        });
    } else if (searchType.value === 'users') {
        await router.visit('/recipes', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                users.value = page.props.users;
                recipes.value = { data: [] }; // Clear recipes
                searchCompleted.value = false;
            }
        });
    }
});

// Updated search function
const search = async () => {
    searchCompleted.value = false;
    isSearching.value = true;

    if (searchQuery.value.trim() === '') {
        // Reload the feed based on searchType
        if (searchType.value === 'recipes') {
            await router.visit('/recipes', {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    recipes.value = page.props.recipes;
                    users.value = { data: [] }; // Clear users
                    searchCompleted.value = false;
                    isSearching.value = false;
                }
            });
        } else if (searchType.value === 'users') {
            await router.visit('/recipes', {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    users.value = page.props.users;
                    recipes.value = { data: [] }; // Clear recipes
                    searchCompleted.value = false;
                    isSearching.value = false;
                }
            });
        }
    } else {
        // Perform the search
        await router.get('/search', { query: searchQuery.value, type: searchType.value }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                if (searchType.value === 'recipes') {
                    recipes.value = page.props.recipes;
                    users.value = { data: [] }; // Clear users
                } else if (searchType.value === 'users') {
                    users.value = page.props.users;
                    recipes.value = { data: [] }; // Clear recipes
                }
                isSearching.value = false;
                searchCompleted.value = true;
            }
        });
    }
};

// Watch for changes to the searchQuery and reload
watch(searchQuery, (newQuery) => {
    if (newQuery.trim() === '') {
        search();
    }
});

const navigateToRecipe = (id) => {
    router.get(`/recipes/${id}`);
};

const navigateToUserProfile = (username) => {
    router.get(`/profile/${username}`);
}
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
                <!-- Add buttons to toggle feed between All and following -->
                <div class="sticky top-0 z-10 flex justify-center space-x-4 mb-4">
                    <Panel class="container py-3 text-center space-x-8">
                        <button @click="toggleFeed('all')" :class="showFollowing ? 'bg-gray-300' : 'bg-orange-400 text-white'" class="p-2 px-4 rounded-lg">Explore</button>
                        <button @click="showNewUploads" :class="showFollowing ? 'bg-orange-400 text-white' : 'bg-gray-300'" class="p-2 px-4 rounded-lg">Following
                            <span v-if="notifications.length > 0" class="ml-2 bg-orange-400 text-white rounded-full px-2">{{notifications.length}}</span>
                        </button>
                    </Panel>
                </div>
                <Panel>
                    <div v-if="recipes.data.length === 0 && searchType === 'recipes' && searchCompleted && !isSearching" class="bg-red-200 p-4 mb-4 rounded-lg">
                        <p>No recipes found. Maybe you should upload one!</p>
                    </div>
                    <div v-if="users.data.length === 0 && searchType === 'users' && searchCompleted && !isSearching" class="bg-red-200 p-4 mb-4 rounded-lg">
                        <p>No users found.</p>
                    </div>
                    <RecipeCard v-for="recipe in recipes.data" v-if="searchType === 'recipes'" :key="recipe.id" :recipe="recipe"  @toggleBookmark="toggleBookmark" :navigateToRecipe="navigateToRecipe"/>
                    <UserCard v-for="user in users.data" v-if="searchType === 'users'" :key="user.id"  :user="user" :navigateToUserProfile="navigateToUserProfile" class="mb-6"/>
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
