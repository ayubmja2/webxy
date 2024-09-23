<script setup>

import axios from "axios";
import {ref, watch} from "vue";

const props = defineProps({
    recipe:{
      type:Object,
      required: true
    },
    compact: {
        type:Boolean,
        default:false
    },
    toggleBookmark:Function
});
const toggleBookmark = async (recipe) => {
    try {
        await axios.post(`/recipes/${recipe.id}/bookmark`);
        recipe.is_bookmarked = !recipe.is_bookmarked;
    } catch (error) {
        console.log('Error bookmarking recipe:', error);
    }
};

const emit = defineEmits(['toggleBookmark']);
const isBookmarked = ref(props.isBookmarked !== undefined ? props.isBookmarked : false);


watch(() => props.recipe.is_bookmarked, (newVal) => {
    isBookmarked.value = newVal;
});

const handleBookmark = () => {
    if (toggleBookmark) {
        isBookmarked.value = !isBookmarked.value;  // Toggle the local bookmark state
        toggleBookmark(props.recipe);  // Call the parent component’s toggleBookmark function
    } else {
        emit('toggleBookmark', props.recipe);
    }
}
</script>

<template>
    <div :class="compact ? 'w-1/2': 'w-1/4' " class="container flex justify-evenly">
        <div class="container grid grid-cols-2 overflow-x-hidden">
            <button class="text-gray-500">
                <i class="fa-regular fa-heart"></i>
            </button>
            <p>0</p>
        </div>
        <div class="container grid grid-cols-2 overflow-x-hidden">
            <button class="text-gray-500">
                <i class="fa-regular fa-comment"></i>
            </button>
            <p>0</p>
        </div>
        <div class="container grid grid-cols-2 overflow-x-hidden">
            <button class="text-gray-500">
                <i class="fa-solid fa-arrows-rotate"></i>
            </button>
            <p>0</p>
        </div>
    </div>

   <button @click="handleBookmark" :class="props.recipe.is_bookmarked ? 'text-darkOrange' : 'text-gray-500'">
       <i :class="props.recipe.is_bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
   </button>
</template>

<style scoped>

</style>
