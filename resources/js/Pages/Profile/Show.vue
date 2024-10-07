<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {ref, computed, onMounted} from 'vue';
import {usePage, Link, router} from '@inertiajs/vue3';
import axios from 'axios';
import Panel from "@/Components/Panel.vue";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm.vue";
import RecipeCard from "@/Components/RecipeCard.vue";
import UserCard from "@/Components/UserCard.vue";
import SectionNavigation from "@/Components/SectionNavigation.vue";
import FollowerNavigation from "@/Components/FollowerNavigation.vue";
import {handleImageChange} from "@/Utils/ImageUploader.js";
import {apiPost} from "@/Utils/ApiService.js";
import {debounce} from "@/Utils/Debounce.js";
import BioModal from "@/Components/BioModal.vue";

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String
    }
});
const SECTIONS = {
    PUBLIC_PROFILE: 'public-profile',
    RECIPES: 'recipes',
    ACCOUNT_INFO: 'account-info',
    SETTINGS: 'settings'
};

const API_ENDPOINTS = {
    UPDATE_BIO: '/profile/update-bio',
    UPDATE_ALLERGENS: '/profile/update-allergens',
    FOLLOW_USER: (username) => `/profile/${username}/follow`,
    UNFOLLOW_USER: (username) => `/profile/${username}/unfollow`
};

const {props} = usePage();
const user = ref(props.user || {});
const recipes = ref(props.recipes || []);
const coverArt = ref(props.user.cover_image_url || '/images/placeholders/default-cover.png');
const profileImage = ref(props.user.profile_image_url || '/images/placeholders/default-profile.png');
const newCoverImage = ref(null);  // This should always be a ref
const newProfileImage = ref(null);  // This should also be a ref
const showDropdown = ref(false);
const currentSection = ref('public-profile'); // State variable to track the current section
const showBioModal = ref(false);
const bio = ref(props.user.bio || '');
const followers = ref(props.followers || []);
const followersCount = ref(props.followersCount || 0);
const recipeCount = ref(props.recipeCount || 0);
const allergiesInput = ref('');
const allergies = ref(props.user.allergens || []);
const following = ref(props.following || []);
const currentFollowerSection = ref('following');

// centralized api request function
const apiRequest = async (url, method = 'POST', data = null) => {
    try{
        const headers = {
            'Content-Type': data instanceof FormData ? 'multipart/form-data': 'application/json'
        };
        const response = await axios({method, url, data, headers});
        return response;
    }catch (error) {
        console.log(`Error during ${method} request to ${url}`)
    }
};

// computed properties

const displayedUsers = computed(() => {
   return currentFollowerSection.value === 'followers' ? followers.value : following.value;
});

const sectionOptions = computed( () => [
    {value: SECTIONS.PUBLIC_PROFILE, label: 'Profile'},
    {value: SECTIONS.RECIPES, label: 'Recipes'},
    {value: SECTIONS.ACCOUNT_INFO, label: 'Account Info'},
    {value: SECTIONS.SETTINGS, label: 'Settings'},
]);

const followerOptions = computed( () => [
    {value: 'followers', label: 'Followers'},
    {value: 'following', label: 'Following'},
]);

// section handlers
const switchSection = async (section) => {
    currentSection.value = section;
};

const switchFollowerSection = (section) => {
    currentFollowerSection.value = section;
}

const openBioModal = () => showBioModal.value = true;
const closeBioModal = () => showBioModal.value = false;

const saveBio = async () => {
    try {
        const response = await apiRequest(API_ENDPOINTS.UPDATE_BIO, 'POST', { bio: bio.value });
        if (response) {
            user.value.bio = bio.value; // Update the user value to ensure reactivity
            closeBioModal();
        }
    } catch (error) {
        console.log('Error saving bio:', error);
    }
};

// Fetch followers and following once

const fetchUsers = async () => {
    const followersRes = await apiRequest(`/profile/${props.user.id}/followers`, 'GET');
    const followingRes = await apiRequest(`/profile/${props.user.id}/following`, 'GET');

    if (followersRes) followers.value = followersRes.data.followers;
    if (followingRes) following.value = followingRes.data.following;
};
onMounted(fetchUsers);

const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

// Image Upload Handlers
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
const handleImageChangeAndUpload = async (event, imageRef, fileType,fileRef) => {
    handleImageChange(event,imageRef,fileRef);
    await updateProfileImage(fileType, fileRef.value);
};
const onCoverImageChange = (event) => handleImageChangeAndUpload(event,coverArt, 'cover_image', newCoverImage);
const onProfileImageChange = (event) => handleImageChangeAndUpload(event, profileImage, 'profile_image', newProfileImage);



// Allergies Handling
const saveAllergies = async () => {
    if (!allergiesInput.value.trim()) return;

    const newAllergy = allergiesInput.value.trim().toLowerCase();
    if (!allergies.value.includes(newAllergy)) {
        const response = await apiRequest('/profile/update-allergens', 'POST', { allergens: [...allergies.value, newAllergy] });
        if (response) allergies.value = response.data.allergens;
    }
    allergiesInput.value = '';
};

const debouncedSaveAllergies = debounce(saveAllergies, 300);

const deleteAllergy = async (allergy) => {
    const response = await apiRequest('/profile/update-allergens', 'POST', {allergens: allergies.value.filter(a => a !== allergy)});
    if (response) allergies.value = response.data.allergens;
};

// Follow/unfollow handlers
const toggleFollowUser = async  (isFollowing) => {
    const url = API_ENDPOINTS[isFollowing ? 'UNFOLLOW_USER' : 'FOLLOW_USER'](user.value.name);
    const response = await apiRequest(url,'POST');
    if(response.status === 200) {
        followersCount.value += isFollowing ? -1 : 1;
        props.isFollowing = !isFollowing;
    }
};

const debouncedToggleFollowerUser = debounce(toggleFollowUser, 300);


// Bookmarking Recipe
const toggleBookmark = async (recipe) => {
    await apiRequest(`/recipes/${recipe.id}/bookmark`, 'POST');
    recipe.is_bookmarked = !recipe.is_bookmarked;
};

// Navigation handlers

const navigateToRecipe = (id) => router.get(`/recipes/${id}`);
const navigateToUserProfile = (username) => router.get(`/profile/${username}`);

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
                    <div class="text-2xl font-medium text-black text-center mt-2 mb-2 p-2">
                        <h1>{{props.user.name}}</h1>
                    </div>
                </div>
            </div>
            <div class="absolute top-0 right-0 m-4" v-if="props.isOwnProfile">
                <button @click="toggleDropdown" class="text-mintGreen hover:text-blue-600">
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
                        <SectionNavigation :currentSection="currentSection" :options="sectionOptions" @switch-section="switchSection"/>
                    </div>
                </Panel>
            </div>
            <!-- Main Body -->

            <div v-if="currentSection === 'public-profile'" class="mt-4">
                <Panel class="p-6 rounded-lg shadow-xl transform transition-transform space-y-2  mx-auto">
                    <div class="grid grid-cols-3 justify-items-center">
                        <div class="col-start-2 font-medium text-2xl mb-6">
                            <h1>Profile</h1>
                        </div>
                        <div class="justify-self-end">
                            <button v-if="props.isOwnProfile" @click="openBioModal" class="bg-darkOrange text-mintGreen p-2 rounded">Edit Bio</button>
                            <div v-if="props.auth.user.id !== props.user.id">
                                <button @click="debouncedToggleFollowerUser(props.isFollowing)" :class="[props.isFollowing ? 'bg-red-500' : 'bg-blue-500']" class="text-mintGreen p-2 rounded">
                                    {{props.isFollowing ? 'Unfollow' : 'Follow'}}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <Panel class="container rounded-lg shadow-xl transform transition-transform h-96">
                                   <div class="grid grid-rows-2 gap-4 p-4 size-full">
                                       <div>
                                           <div class="text-center font-medium">
                                               <h1>Social Networks</h1>
                                               <div class="flex md:flex-wrap max-md:flex-col justify-center md:space-x-4 text-4xl mt-4 max-md:text-lg">
                                                   <Link><i class="fa-brands fa-facebook text-blue-700"></i></Link>
                                                   <Link><i class="fa-brands fa-instagram text-red-700"></i></Link>
                                                   <Link><i class="fa-solid fa-link text-white"></i></Link>
                                                   <Link><i class="fa-brands fa-youtube text-red-700"></i></Link>
                                               </div>
                                           </div>
                                       </div>
                                       <div class="font-medium text-center">
                                           <p>{{ props.user.bio || 'No bio available' }}</p>
                                       </div>
                                   </div>
                                </Panel>
                            </div>
                            <BioModal v-if="showBioModal" :bio="bio" @update:bio="bio = $event" :saveBio="saveBio" :closeModal="closeBioModal" />
                            <div>
                                <div class="container">
                                    <Panel class="rounded-lg shadow-xl transform transition-transform h-96 overflow-hidden overflow-y-scroll">
                                        <FollowerNavigation :currentFollowerSection="currentFollowerSection" :options="followerOptions" @switch-follower-section="switchFollowerSection"/>
                                        <div class="container">
                                            <ul>
                                               <li v-for="user in displayedUsers" :key="user.id" class="mb-5">
                                                   <UserCard :user="user" :key="user.id" :navigateToUserProfile="navigateToUserProfile" :compact="true"/>
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
                                <input type="text" v-model="allergiesInput" @keyup.enter="debouncedSaveAllergies"
                                       placeholder="wheat, soy, eggs" class="rounded-xl">
                                <button @click="saveAllergies"
                                        class="bg-gradient-to-b from-darkOrange to-darkOrange  p-1 px-4 shadow-md transition transform active:translate-x-0 active:translate-y-1 active:shadow-md hover:dark:shadow-orange-500 hover:text-white font-mediump-2 rounded-xl">
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
                                        class="relative font-medium bg-darkOrange text-mintGreen rounded-xl p-3 px-7 min-w-[120px] text-center  shadow-md">
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
