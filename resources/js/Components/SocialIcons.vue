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
    showSocialIcons: {
        type:Boolean,
        default: true
    },
    toggleBookmark:Function
});
const isLiked = ref(props.recipe.is_liked || false);
const likesCount = ref(props.recipe.likes_count || 0);
const repostsCount = ref(props.recipe.reposts_count || 0);
const toggleBookmark = async (recipe) => {
    try {
        await axios.post(`/recipes/${recipe.id}/bookmark`);
        recipe.is_bookmarked = !recipe.is_bookmarked;
    } catch (error) {
        console.log('Error bookmarking recipe:', error);
    }
};
const toggleLike = async (recipe) => {
    try {
        await axios.post(`/recipes/${recipe.id}/like`);
        recipe.is_liked = !recipe.is_liked  ; // toggle the liked status
    }catch (error) {
        console.log('Error liking recipe:', error);
    }
};

const emit = defineEmits(['toggleBookmark', 'toggleLike']);

//bookmark
const isBookmarked = ref(props.isBookmarked !== undefined ? props.isBookmarked : false);
//reposted
const isReposted = ref(props.recipe.is_reposted || false);


watch(() => props.recipe.is_liked, (newVal) => {
    isLiked.value = newVal;
})


watch(() => props.recipe.is_bookmarked, (newVal) => {
    isBookmarked.value = newVal;
});

//handles bookmark
const handleBookmark = () => {
    if (toggleBookmark) {
        isBookmarked.value = !isBookmarked.value;  // Toggle the local bookmark state
        toggleBookmark(props.recipe);  // Call the parent component’s toggleBookmark function
    } else {
        emit('toggleBookmark', props.recipe);
    }
}

//handles likes
const handleLike = async () => {
    try {
        const response = await axios.post(`/recipes/${props.recipe.id}/like`);
        isLiked.value = !isLiked.value; // toggle the local like state
        likesCount.value = response.data.likes_count; // update likes count from server response
    } catch(error) {
        console.error("Error toggling like", error);
    }
}

//handles repost
const handleRepost = async () => {
    try {
        const response = await axios.post(`/recipes/${props.recipe.id}/repost`);
        isReposted.value = response.data.reposted;

        // Update the repost count based on the action (repost or undo repost)
        if (isReposted.value) {
            repostsCount.value++;
        } else {
            repostsCount.value--;
        }
    } catch (error) {
        console.error("Error toggling repost:", error);
    }
};
</script>

<template>
    <div class="container flex justify-between">
       <div class="container grid grid-cols-2">
           <div v-if="showSocialIcons" :class="compact ? 'w-1/2': 'w-1/2' " class="container flex justify-between">
               <div class="container grid grid-cols-2 overflow-x-hidden">
                   <button @click="handleLike" :class="isLiked ? 'text-red-500' : 'text-gray-500'">
                       <i :class="isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                   </button>
                   <p>{{likesCount}}</p>
               </div>
<!--               <div class="container grid grid-cols-2 overflow-x-hidden">-->
<!--                   <button class="text-gray-500">-->
<!--                       <i class="fa-regular fa-comment"></i>-->
<!--                   </button>-->
<!--                   <p>0</p>-->
<!--               </div>-->
               <div class="container grid grid-cols-2 overflow-x-hidden">
                   <button @click="handleRepost" :class="isReposted ? 'tet-blue-500' : 'text-gray-500'">
                       <i class="fa-solid fa-arrows-rotate"></i>
                   </button>
                   <p>{{repostsCount}}</p>
               </div>
           </div>
           <div class="col-start-2 place-self-end">
               <button @click="handleBookmark" :class="props.recipe.is_bookmarked ? 'text-darkOrange' : 'text-gray-500'">
                   <i :class="props.recipe.is_bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
               </button>
           </div>
       </div>
    </div>
</template>

<style scoped>

</style>
