<script setup>
import RecipeCardFooter from "@/Components/RecipeCardFooter.vue";

const props = defineProps({
    recipe: {
        type: Object,
        required: true,
    },
    showBookmark: {
        type: Boolean,
        default: true
    },
    iconCompact: {
        type: Boolean,
        default:false
    },
    compact: {
        type: Boolean,
        default: false,
    },
    showFooter: {
      type:Boolean,
      default:true
    },
    showSocialIcons: {
        type: Boolean,
        default: true
    },
    toggleBookmark:Function,
    navigateToRecipe: Function,
});
</script>
<template>

    <div :class="compact ? 'border rounded-md shadow-md p-2' : 'border rounded-lg shadow-lg p-4 mb-6'" class="bg-green-200">
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
                        {{ recipe.description }}
                    </div>
                    <div class="container m-auto">
                        <button v-if="compact" class="bg-orange-500 text-white py-1 px-3 rounded-lg"
                                @click="navigateToRecipe(recipe.id)">Info
                        </button>
                    </div>
                </div>
            </div>
            <RecipeCardFooter v-if="showFooter" :recipe="props.recipe" :toggleBookmark="toggleBookmark" :showSocialIcons/>
        </div>
    </div>
</template>

<style scoped>

</style>
