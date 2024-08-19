<script setup>
import {computed} from "vue";
const props = defineProps({
    user: {
        type: Object,
        required:true
    },
    navigateToUserProfile:Function
});

// Fallback to default profile image if profile_image_url is empty or null
const profileImageUrl = computed(() => {
    return props.user.profile_image_url || '/images/placeholders/default-profile.png';
});

</script>

<template>

    <div class="border rounded-lg shadow-lg p-4 bg-green-200">
        <div class="container">
            <div class="grid grid-cols-2">
                <div class="flex flex-col justify-self-center">
                    <div class="mx-auto">
                        <img :src="profileImageUrl" alt="Recipe Image"
                             class="w-fit md:w-40  object-cover rounded-xl bg-orange-400 shadow-2xl dark:shadow-orange-300 mb-8">
                    </div>
                </div>
                <div
                    class="container p-2 grid grid-rows-3 text-center space-y-4">
                    <div class="font-bold text-lg my-auto">
                        {{ user.name }}
                    </div>
                    <div class="container  m-auto">
                        <button class="bg-orange-500 text-white py-1 px-3 rounded-lg"
                                @click="navigateToUserProfile(user.name)">Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
