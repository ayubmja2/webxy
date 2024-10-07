<script setup>
import {computed} from "vue";

const props = defineProps({
    user: {
        type: Object,
        required:true
    },
    compact: {
      type: Boolean,
      default: false,
    },
    navigateToUserProfile:Function
});

// Fallback to default profile image if profile_image_url is empty or null
const profileImageUrl = computed(() => {
    return props.user.profile_image_url || '/images/placeholders/default-profile.png';
});

</script>

<template>

    <div :class="compact ? 'border rounded-md shadow-md p-2 ' : 'border rounded-lg shadow-lg p-4' " class="bg-green-200">
        <div class="container">
            <div :class="compact ? 'grid grid-cols-3' : 'grid grid-cols-2' ">
                <div :class="compact ? 'flex flex-col justify-self-center': 'flex flex-col justify-self-center'">
                    <div :class="compact ? 'mx-auto' : 'm-auto'">
                        <img :src="profileImageUrl" alt="Recipe Image"
                             :class="compact ? 'w-fit md:w-20 rounded-full':  'w-fit md:w-40  object-cover rounded-xl bg-darkOrange shadow-2xl dark:shadow-darkOrange mb-8'">
                    </div>
                </div>
                <div
                    :class=" compact ? 'container p-2 grid-grid-row-2 text-center space-y-4 col-span-2' :'container p-2 grid grid-rows-3 text-center space-y-4 '">
                    <div :class="compact ? 'font-bold text-sm my-auto' : 'font-bold text-lg my-auto'">
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
