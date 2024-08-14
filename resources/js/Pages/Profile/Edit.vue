<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import axios from 'axios';
import Panel from "@/Components/Panel.vue";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm.vue";


defineProps({
    mustVerifyEmail : {
        type:Boolean,
    },
    status: {
        type: String
    }
});

const { props } = usePage();

const coverArt = ref(props.user.cover_image_url || '');
const profileImage = ref(props.user.profile_image_url || '');
const newCoverImage = ref(null);
const newProfileImage = ref(null);
const showDropdown = ref(false);
const currentSection = ref('public-profile'); // State variable to track the current section

const showBioModal = ref(false);
const bio = ref(props.user.bio || '');
const followers = ref(props.followers || []);
const followersCount = ref(props.followersCount || 0);
const recipeCount = ref(props.recipeCount || 0);

console.log(recipeCount);
const openBioModal = () => {
    showBioModal.value = true;
};

const closeBioModal = () => {
    showBioModal.value = false;
};

const saveBio = async() => {
    try{
        await axios.post('/profile/update-bio', {bio: bio.value});
        props.user.bio = bio.value;
        closeBioModal();
    }catch (error){
        alert('Failed to update bio.')
    }
};

//fetch followers when the component is mounted
const fetchFollowers = async() => {
    try{
        const response = await axios.get(`/profile/${props.user.id}/followers`);
        followers.value = response.data.followers;
    }catch (error) {
        console.log('Error fetching followers:');
    }
};
fetchFollowers();
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

const switchSection = (section) => {
    currentSection.value = section;
};

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

const followUser = async() => {
    try{
        const response = await axios.post(`/profile/${props.user.id}/follow`);
        props.isFollowing = true;
    }catch(error){
        console.log('Error following user');
    }
};
const unfollowUser = async() => {
    try{
        const response = await axios.post(`/profile/${props.user.id}/unfollow`);
        props.isFollowing = false;
    }catch (error) {
        console.log('Error unfollowing user:');
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <div class="relative">
            <img :src="coverArt || '/default-cover.jpg'" alt="cover art" class="w-full h-60 object-cover">
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center mt-4">
                <div class="relative">
                    <img :src="profileImage || '/default-profile.jpg'" alt="profile image"
                         class="w-24 h-24 rounded-full border-4 border-white object-cover cursor-pointer">
                    <input type="file" @change="onProfileImageChange" accept="image/*"
                           class="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full" v-if="props.isOwnProfile">
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

        <div class="container mx-auto mt-4">
            <div class="flex flex-col">
                <Panel>
                    <div class="container mx-auto">
                        <ul class="flex flex-row justify-evenly">
                            <li>
                                <button @click="switchSection('public-profile')"
                                        class="bg-amber-500 rounded-2xl p-1 px-4">Public Profile
                                </button>
                            </li>
                            <li>
                                <button @click="switchSection('account-info')"
                                        class="bg-amber-500 rounded-2xl p-1 px-4" v-if="props.isOwnProfile">Account Info
                                </button>
                            </li>
                            <li>
                                <button @click="switchSection('settings')" class="bg-amber-500 rounded-2xl p-1 px-4"
                                        v-if="props.isOwnProfile">
                                    Settings
                                </button>
                            </li>
                        </ul>
                    </div>
                </Panel>

                <!-- Sections -->
                <div v-if="currentSection === 'account-info' && props.isOwnProfile" class="grid grid-cols-2 p-2">
                    <!-- Allergies Section-->
                    <div class="container">
                        <Panel class="space-y-2 w-1/2 mx-auto">
                            <div class="text-center font-medium text-2xl">
                                <h1>Allergies</h1>
                            </div>
                            <div class="container mx-auto flex flex-col space-y-4 p-6">
                                <input type="text" v-model="allergiesInput" placeholder="wheat, soy, eggs"
                                       class="rounded-xl">
                                <button @click="saveAllergies" class="bg-amber-500 p-2 rounded-xl">Save</button>
                            </div>
                        </Panel>
                    </div>
                    <!-- Account Stats section -->
                    <div class="container">
                        <Panel class="w-3/4 mx-auto">
                            <div class="text-center font-medium text-2xl mb-3">
                                <h1>Account Stats</h1>
                            </div>
                            <div class="flex flex-row justify-center">
                               <div class="text-center mb-4">
                                   <p>You have created {{recipeCount}} recipes.</p>
                                   <p>You have {{followersCount}} followers.</p>
                               </div>
                            </div>
                        </Panel>
                    </div>
                </div>

                <!-- Your Food Allergies Section -->
                <div v-if="currentSection === 'account-info' && props.isOwnProfile"
                     class="container row-start-2 col-span-2 mt-6">
                    <div class="flex flex-col">
                        <Panel>
                            <div class="text-center font-medium text-2xl">
                                <h1>Your Food Allergies</h1>
                            </div>
                            <div class="container mt-8">
                                <div>
                                    <!-- This is where the allergies will render after form submission.-->
                                    <ul class="grid grid-rows-4 grid-flow-col gap-4 justify-items-center">
                                        <li v-for="allergy in allergies" :key="allergy"
                                            class="relative bg-amber-500 rounded-2xl p-2 px-4">
                                            <span>{{ allergy.charAt(0).toUpperCase() + allergy.slice(1) }}</span>
                                            <button @click="deleteAllergy(allergy)"
                                                    class="absolute top-1 right-1 text-red-600 font-bold">X
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>

                <div v-if="currentSection === 'public-profile'">
                    <!-- Public Profile Content Here -->
                    <Panel>
                        <div class="text-center font-medium text-2xl">
                            <h1>Public Profile</h1>
                        </div>
                        <div class="container mt-8">
                            <div>
                                <!-- This is where the user's bio and public profile information will render -->
                                <p>{{ props.user.bio  || 'No bio available.'}}</p>
                                <button v-if="props.isOwnProfile" @click="openBioModal" class="bg-blue-500 text-white p-2 rounded">Edit Bio</button>
                                <!-- Display Follow/Unfollow button if viewing another user's profile -->
                                <div v-if="props.authUser.id !== props.user.id">
                                    <button v-if="!props.isFollowing" @click="followUser"
                                            class="bg-blue-500 text-white p-2 rounded">Follow
                                    </button>
                                    <button v-else @click="unfollowUser" class="bg-red-500 text-white p-2 rounded">
                                        Unfollow
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Panel>
                    <!-- Modal for Bio Editing  -->
                    <div v-if="showBioModal" class="fixed z-10 inset-0 overflow-y-auto">
                        <div class="flex items-center justify-center min-h-screen">
                            <div class="bg-white p-6 rounded-center min-h-screen">
                                <h2 class="text-xl mb-4">Edit Bio</h2>
                                <textarea v-model="bio" class="w-full p-2 border rounded mb-4" rows="4"></textarea>
                                <button @click="saveBio" class="bg-green-500 text-white p-2 rounded">Save</button>
                                <button @click="closeBioModal" class="bg-red-500 text-white p-2 rounded">Cancel</button>
                            </div>
                        </div>
                    </div>
                <!--   Followers List Section -->
                    <Panel>
                        <div class="text-center font-medium text-sxl">
                            <h1>Followers</h1>
                        </div>
                        <div class="container mt-8">
                            <ul v-for="follower in followers" :key="follower.id" class="p-2">
                                <Link :href="`/profile/${follower.id}`" class="text-blue-500">{{follower.name}}</Link>
                            </ul>
                        </div>
                    </Panel>
                </div>

                <div v-if="currentSection === 'settings' && props.isOwnProfile">
                    <!-- Settings Content Here -->
                    <Panel>
                        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" class="max-w-xl"/>
                        </div>
                        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdatePasswordForm class="max-w-xl"/>
                        </div>
                        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <DeleteUserForm class="max-w-xl"/>
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
