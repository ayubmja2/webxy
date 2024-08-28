<script setup>
import {ref, watch} from "vue";



const props = defineProps({
    recipe: {
        type: Object,
        required: true,
    },
    showBookmark: {
        type: Boolean,
        default: true
    },
    compact: {
        type: Boolean,
        default: false,
    },
    toggleBookmark: Function,
    navigateToRecipe: Function,
});

const emit = defineEmits(['toggleBookmark']);
const isBookmarked = ref(props.isBookmarked !== undefined ? props.isBookmarked : false);


watch(() => props.recipe.is_bookmarked, (newVal) => {
    isBookmarked.value = newVal;
});
const handleBookmark = () => {
    if (props.toggleBookmark) {
        isBookmarked.value = !isBookmarked.value;  // Toggle the local bookmark state
        props.toggleBookmark(props.recipe);  // Call the parent component’s toggleBookmark function
    } else {
        emit('toggleBookmark', props.recipe);
    }
}



</script>

<template>

    <div :class="compact ? 'border rounded-md shadow-md p-2' : 'border rounded-lg shadow-lg p-4 mb-6'"
         class="bg-green-200">
        <div class="container">
            <div :class="compact ? 'grid grid-cols-3' : 'grid grid-cols-2' ">
                <div :class="compact ? 'flex flex-col justify-self-center': 'flex flex-col justify-self-center'">
                    <div :class="compact ? 'mx-auto' : 'm-auto'">
                        <img v-if="recipe.image_url" :src="recipe.image_url" alt="Recipe Image"
                             :class="compact ? 'w-fit md:w-20 rounded-full':  'w-fit md:w-40  object-cover rounded-xl bg-darkOrange shadow-2xl dark:shadow-darkOrange mb-8'">
                    </div>
                    <button v-if="!compact" class="bg-darkOrange text-white py-2 px-4 rounded-lg"
                            @click="navigateToRecipe(recipe.id)">Info
                    </button>
                </div>
                <div
                    :class=" compact ? 'container p-2 grid-grid-row-2 text-center space-y-4 col-span-2' :'container p-2 grid grid-rows-3 text-center space-y-4 '">
                    <div :class="compact ? 'font-bold text-sm my-auto' : 'font-bold text-lg my-auto'">
                        {{ recipe.title }}
                    </div>
                    <div v-if="!compact"
                         :class="compact ? 'container font-medium text-sm line-clamp-1': 'container font-medium text-lg line-clamp-2'">
                        <!--                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.-->
                        {{ recipe.description }}
                    </div>
                    <div class="container  m-auto">
                        <button v-if="compact" class="bg-orange-500 text-white py-1 px-3 rounded-lg"
                                @click="navigateToRecipe(recipe.id)">Info
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="showBookmark" class="container flex justify-end">
                <button @click="handleBookmark" :class="props.recipe.is_bookmarked ? 'text-orange-500' : 'text-gray-500'"
                        class="bookmark-icon">
                    <i :class="props.recipe.is_bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
