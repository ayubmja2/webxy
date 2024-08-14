<script setup>
import {ref, watch, computed} from "vue";

const props = defineProps({
    recipe:{
        type: Object,
        required: true,
    },
    isBookmarked: {
        type: Boolean,
        default: true,
    },
    showBookmark: {
      type:Boolean,
      default: true
    },
    compact : {
        type: Boolean,
        default:false,
    },
    toggleBookmark: Function,
    navigateToRecipe: Function,
});


const emit = defineEmits(['toggleBookmark']);

const isBookmarked = ref(props.isBookmarked);

const handleBookmark = () => {
    if(props.toggleBookmark){
        props.toggleBookmark(props.recipe);
    }else {
        emit('toggleBookmark', props.recipe);
    }
}


</script>

<template>

    <div :class="compact ? 'border rounded-md shadow-md p-2' : 'border rounded-lg shadow-lg p-4 mb-6'" class="bg-green-200">
        <div class="container">
            <div :class="compact ? 'grid grid-cols-3' : 'grid grid-cols-2' ">
                <div :class="compact ? 'flex flex-col justify-self-center': 'flex flex-col justify-self-center'">
                    <div :class="compact ? 'mx-auto' : 'm-auto'">
                        <img v-if="recipe.image_url" :src="recipe.image_url" alt="Recipe Image"
                             :class="compact ? 'w-fit md:w-20 rounded-full':  'w-fit md:w-40  object-cover rounded-xl bg-orange-400 shadow-2xl dark:shadow-orange-300'">
                    </div>
                    <button v-if="!compact" class="bg-orange-500 text-white py-2 px-4 rounded-lg" @click="navigateToRecipe(recipe.id)">Info</button>
                </div>
                <div :class=" compact ? 'container p-2 grid-grid-row-2 text-center space-y-4 col-span-2' :'container p-2 grid grid-rows-3 text-center space-y-4 '">
                    <div :class="compact ? 'font-bold text-sm my-auto' : 'font-bold text-lg my-auto'">
                        {{recipe.title}}
                    </div>
                    <div v-if="!compact" :class="compact ? 'container font-medium text-sm line-clamp-1': 'container font-medium text-lg line-clamp-2'">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div class="container  m-auto">
                        <button v-if="compact" class="bg-orange-500 text-white py-1 px-3 rounded-lg" @click="navigateToRecipe(recipe.id)">Info</button>
                    </div>
                </div>
            </div>
            <div v-if="showBookmark" class="container flex justify-end">
                <button @click="handleBookmark" :class="isBookmarked ? 'text-orange-500' : 'text-gray-500'" class="bookmark-icon">
                    <i :class="isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
