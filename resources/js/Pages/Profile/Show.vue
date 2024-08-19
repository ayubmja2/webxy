<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {ref} from 'vue';
import {usePage, Link, router} from '@inertiajs/vue3';
import axios from 'axios';
import Panel from "@/Components/Panel.vue";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm.vue";
import RecipeCard from "@/Components/RecipeCard.vue";
import UserCard from "@/Components/UserCard.vue";

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String
    }
});

const {props} = usePage();

const recipes = ref(props.recipes || []);


const coverArt = ref(props.user.cover_image_url || '/images/placeholders/default-cover.png');
const profileImage = ref(props.user.profile_image_url || '/images/placeholders/default-profile.png');
const newCoverImage = ref(null);
const newProfileImage = ref(null);
const showDropdown = ref(false);
const currentSection = ref('public-profile'); // State variable to track the current section

const showBioModal = ref(false);
const bio = ref(props.user.bio || '');

const followers = ref(props.followers || []);
const followersCount = ref(props.followersCount || 0);
const recipeCount = ref(props.recipeCount || 0);
const following = ref(props.following || []);

const currentFollowerSection = ref('following');

const openBioModal = () => {
    showBioModal.value = true;
};

const closeBioModal = () => {
    showBioModal.value = false;
};

const saveBio = async () => {
    try {
        await axios.post('/profile/update-bio', {bio: bio.value});
        props.user.bio = bio.value;
        closeBioModal();
    } catch (error) {
        alert('Failed to update bio.')
    }
};

//fetch followers when the component is mounted
const fetchFollowers = async () => {
    try {
        const response = await axios.get(`/profile/${props.user.id}/followers`);
        followers.value = response.data.followers;
    } catch (error) {
        console.log('Error fetching followers:');
    }
};
const fetchFollowing = async () => {
    try {
        const response = await axios.get(`/profile/${props.user.id}/following`);
        following.value = response.data.following;
    } catch (error) {
        console.log('Error fetching following:');
    }
};
fetchFollowers();
fetchFollowing();

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const onCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            coverArt.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    newCoverImage.value = file;
    updateProfileImage('cover_image', newCoverImage.value);
};

const onProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    newProfileImage.value = file;
    updateProfileImage('profile_image', newProfileImage.value);
};

const updateProfileImage = async (type, file) => {
    const formData = new FormData();
    formData.append(type, file);

    try {
        await axios.post('/profile/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        alert('Failed to update profile.');
    }
};

const switchSection = async (section) => {
    currentSection.value = section;
};

//switch between "Following" and "Followers
const switchFollowerSection = (section) => {
    currentFollowerSection.value = section;
}
// Allergies handling
const allergiesInput = ref('');
const allergies = ref(props.user.allergens || []);

const saveAllergies = async () => {
    if (!allergiesInput.value.trim()) {
        return;
    }

    const newAllergy = allergiesInput.value.trim().toLowerCase();
    if (allergies.value.includes(newAllergy)) {
        return;
    }

    try {
        const response = await axios.post('/profile/update-allergens', {allergens: [...allergies.value, newAllergy]});
        allergies.value = response.data.allergens;
        allergiesInput.value = '';
    } catch (error) {
        alert('Failed to update allergens.')
    }
};

const deleteAllergy = async (allergy) => {
    try {
        const response = await axios.post('/profile/update-allergens', {allergens: allergies.value.filter(a => a !== allergy)});
        allergies.value = response.data.allergens;
    } catch (error) {
        alert('Failed to delete allergy.');
    }
};

const followUser = async () => {
    try {
        const response = await axios.post(`/profile/${props.user.name}/follow`);
        if (response.status === 200) {
            props.isFollowing = true;
            followersCount.value += 1;
        }
    } catch (error) {
        console.log('Error following user', error);
    }
};
const unfollowUser = async () => {
    try {
        const response = await axios.post(`/profile/${props.user.name}/unfollow`);
        if (response.status === 200) {
            props.isFollowing = false;
            followersCount.value -= 1;
        }
    } catch (error) {
        console.log('Error unfollowing user:', error);
    }
};

const toggleBookmark = async (recipe) => {
    try {
        await axios.post(`/recipes/${recipe.id}/bookmark`);
        recipe.is_bookmarked = !recipe.is_bookmarked;
    } catch (error) {
        console.log('Error bookmarking recipe:', error);
    }
};
const navigateToRecipe = (id) => {
    router.get(`/recipes/${id}`);
};
const navigateToUserProfile = (username) => {
    router.get(`/profile/${username}`);
}
</script>

<template>
    <AuthenticatedLayout>
        <div class="relative">
            <img :src="coverArt" alt="cover art" class="w-full h-60 object-cover">
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center mt-4">
                <div class="relative">
                    <img :src="profileImage" alt="profile image"
                         class="w-24 h-24 rounded-full border-4 border-white object-cover cursor-pointer">
                    <input type="file" @change="onProfileImageChange" accept="image/*"
                           class="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full"
                           v-if="props.isOwnProfile">
                </div>
            </div>
            <div class="absolute top-0 right-0 m-4" v-if="props.isOwnProfile">
                <button @click="toggleDropdown" class="text-white hover:text-blue-600">
                    <i class="fa-solid fa-gear fa-2x"></i>
                </button>
                <div v-if="showDropdown" class="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20">
                    <label class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input type="file" @change="onCoverImageChange" accept="image/*" class="hidden">
                        Upload Cover Art
                    </label>
                </div>
            </div>
        </div>
        <div class="px-10">
            <!--  Profile Navigation -->
            <div class="mx-auto mt-4">
                <Panel class="p-6 rounded-lg shadow-xl transform transition-transform">
                    <div class="container mx-auto">
                        <ul class="flex justify-evenly items-center">
                            <li>
                                <button @click="switchSection('public-profile')" :class="{'text-white' : currentSection === 'public-profile'}"
                                        class="bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium">
                                    Profile
                                </button>
                            </li>

                            <li v-if="!props.isOwnProfile">
                                <button @click="switchSection('recipes')" :class="{'text-white' : currentSection === 'recipes'}"
                                        class="bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium">
                                    Recipes
                                </button>
                            </li>

                            <li v-if="props.isOwnProfile">
                                <button @click="switchSection('account-info')" v-if="props.isOwnProfile" :class="{'text-white' : currentSection === 'account-info'}"
                                        class="bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium">
                                    Account Info
                                </button>
                            </li>
                            <li v-if="props.isOwnProfile">
                                <button @click="switchSection('settings')" v-if="props.isOwnProfile" :class="{'text-white' : currentSection === 'settings'}"
                                        class="bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium">
                                    Settings
                                </button>
                            </li>
                        </ul>
                    </div>
                </Panel>
            </div>
            <!-- Main Body -->

            <div v-if="currentSection === 'public-profile'" class="mt-4">
                <Panel class="p-6 rounded-lg shadow-xl transform transition-transform space-y-2  mx-auto">
                    <div class="text-center font-medium text-2xl mb-6">
                        <h1>Profile</h1>
                    </div>
                    <div class="mt-8">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <Panel
                                    class="p-6 rounded-lg shadow-xl transform transition-transform space-y-2  mx-auto">
                                    <div class="font-medium text-center">
                                        <p>{{ props.user.bio || 'No bio available' }}</p>
                                    </div>
                                </Panel>
                                <hr class="border-orange-400 mt-4">
                                <button v-if="props.isOwnProfile" @click="openBioModal"
                                        class="bg-orange-400 text-white p-2 rounded mt-2">Edit Bio
                                </button>
                                <div v-if="props.auth.user.id !== props.user.id">
                                    <button v-if="!props.isFollowing" @click="followUser"
                                            class="bg-blue-500 text-white p-2 rounded">Follow
                                    </button>
                                    <button v-else @click="unfollowUser" class="bg-red-500 text-white p-2 rounded">
                                        Unfollow
                                    </button>
                                </div>
                            </div>
                            <!-- Modal for Bio Editing  -->
                            <div v-if="showBioModal" class="fixed z-10 inset-0 overflow-y-auto">
                                <div class="flex items-center justify-center min-h-screen">
                                    <div class="bg-white p-6 rounded-center min-h-screen">
                                        <h2 class="text-xl mb-4">Edit Bio</h2>
                                        <textarea v-model="bio" class="w-full p-2 border rounded mb-4"
                                                  rows="4"></textarea>
                                        <button @click="saveBio" class="bg-green-500 text-white p-2 rounded">Save
                                        </button>
                                        <button @click="closeBioModal" class="bg-red-500 text-white p-2 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="container mx-auto">
                                    <Panel
                                        class="rounded-lg shadow-xl transform transition-transform space-y-1 mx-auto">
                                        <ul class="flex justify-evenly mb-4">
                                            <li>
                                                <button @click="switchFollowerSection('followers')" :class="{'text-white' : currentFollowerSection === 'followers'}"
                                                        class="bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium">
                                                    Followers
                                                </button>
                                            </li>
                                            <li>
                                                <button @click="switchFollowerSection('following')" :class="{'text-white' : currentFollowerSection === 'following'}"
                                                        class="bg-gradient-to-b from-orange-400 to-orange-400 rounded-2xl p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-medium">
                                                    Following
                                                </button>
                                            </li>
                                        </ul>
                                        <div class="container mx-auto w-3/4 overflow-hidden overflow-y-scroll">
                                            <ul v-if="currentFollowerSection === 'followers'" class="grid grid-cols-1 overflow-hidden overflow-y-scroll">
                                               <li class="h-96 mb-5">
                                                   <UserCard v-for="user in followers" :user="user" :key="user.id" :navigateToUserProfile="navigateToUserProfile" class="mb-2"/>
                                               </li>
                                            </ul>

                                            <ul v-if="currentFollowerSection === 'following'" class="grid grid-cols-1 overflow-hidden overflow-y-scroll">
                                                <li>
                                                    <UserCard  v-for="user in following" :user="user" :key="user.id" :navigateToUserProfile="navigateToUserProfile" class="mb-2"/>
                                                </li>
                                            </ul>
                                        </div>
                                    </Panel>
                                </div>
                            </div>

                        </div>
                    </div>
                </Panel>
            </div>

            <div v-if="currentSection === 'recipes'" class="mt-4">
                <Panel class="p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto">
                    <div class="text-center font-medium text-2xl mb-6">
                        <h1>{{ props.user.name }}'s Recipes</h1>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden overflow-y-scroll">
                        <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"
                                    @toggleBookmark="toggleBookmark" :navigateToRecipe="navigateToRecipe"
                                    class="p-6 rounded-lg shadow-xl transform transition-transform space-y-2 mx-auto"/>
                    </div>
                </Panel>
            </div>

            <div v-if="currentSection === 'account-info' && props.isOwnProfile" class="grid grid-cols-2 p-2 mt-3 gap-4">
                <!--   Allergies sections   -->
                <div>
                    <div class="mb-3">
                        <Panel class="p-6 rounded-lg shadow-xl transform transition-transform space-y-2 w-3/4 mx-auto">
                            <div class="text-center font-medium text-2xl">
                                <h1>Allergies</h1>
                            </div>
                            <div class="flex flex-col space-y-4 p-6 mx-auto">
                                <input type="text" v-model="allergiesInput" @keyup.enter="saveAllergies"
                                       placeholder="wheat, soy, eggs" class="rounded-xl">
                                <button @click="saveAllergies"
                                        class="bg-gradient-to-b from-orange-400 to-orange-400  p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-mediump-2 rounded-xl">
                                    Save
                                </button>
                            </div>
                        </Panel>
                    </div>
                    <div class="container mx-auto row-start-2 row-span-2">
                        <Panel class="p-6 rounded-lg shadow-xl transform transition-transform">
                            <div class="text-center font-medium text-2xl">
                                <h1>Your Food Allergies</h1>
                            </div>
                            <div class="p-7 h-28 overflow-hidden overflow-x-scroll">
                                <ul class="grid grid-rows-1 grid-flow-col gap-3 justify-items-center space-x-1">
                                    <li v-for="allergy in allergies" :key="allergy"
                                        class="relative font-medium bg-orange-400 rounded-xl p-3 px-7 min-w-[120px] text-center  shadow-md">
                                        <span>{{ allergy.charAt(0).toUpperCase() + allergy.slice(1) }}</span>
                                        <button @click="deleteAllergy(allergy)"
                                                class="absolute top-1 right-1 text-red-600 font-bold">X
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </Panel>
                    </div>
                </div>
                <div class="container row-span-2">
                    <Panel class="rounded-lg shadow-xl transform transition-transform">
                        <div class="grid grid-cols-1 h-96 font-medium text-2xl">
                            <div>
                                <div class="text-center">
                                    <h3>Account Stats</h3>
                                </div>
                                <div class="container mt-2">
                                    <Panel class="rounded-lg shadow-xl transform transition-transform">
                                        <div class="font-normal text-xl">
                                            <p>You have created {{ recipeCount }} recipes so far way to go !</p>
                                            <p>You have {{ followersCount }} followers !</p>
                                        </div>
                                    </Panel>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
            <div v-if="currentSection === 'settings' && props.isOwnProfile" class="mt-2">
                <Panel class="rounded-lg shadow-xl transform transition-transform">
                    <div class="text-center mb-5 font-medium text-2xl">
                        <h1>Account Settings</h1>
                    </div>
                    <div class="grid grid-cols-3 gap-4 px-8 pb-8">
                        <Panel class="rounded-lg shadow-xl transform transition-transform">
                            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status"/>
                            </div>
                        </Panel>
                        <Panel class="rounded-lg shadow-xl transform transition-transform">
                            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdatePasswordForm/>
                            </div>
                        </Panel>
                        <Panel class="rounded-lg shadow-xl transform transition-transform">
                            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <DeleteUserForm/>
                            </div>
                        </Panel>
                    </div>
                </Panel>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.container {
    max-width: 1200px;
}

.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -50px;
}

.profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 5px solid white;
    object-fit: cover;
    cursor: pointer;
}

.cover-art {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.relative {
    position: relative;
}

.absolute {
    position: absolute;
}

.bg-amber-500 {
    background-color: #f59e0b;
}

.rounded-2xl {
    border-radius: 1rem;
}

.p-2 {
    padding: 0.5rem;
}

.px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.text-red-600 {
    color: #e3342f;
}

.font-bold {
    font-weight: 700;
}

.hover\:text-blue-600:hover {
    color: #3182ce;
}
</style>
