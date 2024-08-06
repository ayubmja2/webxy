<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';
import Panel from "@/Components/Panel.vue";

const { props } = usePage();
const coverArt = ref(props.auth.user.cover_image_url || '');
const profileImage = ref(props.auth.user.profile_image_url || '');
const newCoverImage = ref(null);
const newProfileImage = ref(null);
const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const handleProfileImageClick = () => {
    alert("Profile Image Clicked");
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
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
    }
};
</script>
<template>
    <AuthenticatedLayout>
        <div class="relative">
            <img :src="coverArt || '/default-cover.jpg'" alt="cover art" class="w-full h-60 object-cover">
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center mt-4">
                <div class="relative">
                    <img :src="profileImage || '/default-profile.jpg'" alt="profile image" class="w-24 h-24 rounded-full border-4 border-white object-cover cursor-pointer" @click="handleProfileImageClick">
                    <input type="file" @change="onProfileImageChange" accept="image/*" class="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full">
                </div>
            </div>
            <div class="absolute top-0 right-0 m-4">
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
        <div class="mx-auto">
            <div class="flex flex-col">
                <div class="grid grid-cols-2">
                    <div class="container h-80 place-content-center">
                       <Panel class="space-y-6 w-1/2 mx-auto">
                           <div class="text-center mt-4 font-medium text-2xl">
                               <h1>Allergies</h1>
                           </div>
                           <div class="flex flex-row space-x-6 justify-center">
                               <input type="text" placeholder="Wheat, Soy" class="rounded-xl">
                               <button class="bg-amber-500 p-2 rounded-xl">Submit</button>
                           </div>
                       </Panel>
                    </div>
                    <div class="container h-80 place-content-center">
                        <Panel class="space-y-6 w-1/2 mx-auto">
                            <div class="text-center mt-4 font-medium text-2xl">
                                <h1>Account Stats</h1>
                            </div>
                            <div class="flex flex-row space-x-6 justify-center">
                               <p>Amount of recipes posted during year/account visits and follows</p>
                            </div>
                        </Panel>
                    </div>
                    <!-- This is where the users allergies will be inserted-->
                    <div class="container mx-auto row-start-2 col-span-2 ">
                        <div class="flex flex-col text-center font-medium text-2xl">
                           <Panel>
                               <h1>Your Food Allergies</h1>
                           </Panel>
                        </div>
                    </div>
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
</style>
