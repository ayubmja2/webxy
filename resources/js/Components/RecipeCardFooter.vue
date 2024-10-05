<script setup>
import SocialIcons from "@/Components/SocialIcons.vue";

const props = defineProps({
    recipe: {
      type: Object,
      required:true
    },
    showFooter : {
        type:Boolean,
        default: true
    },
    showSocialIcons: {
        type: Boolean,
        default: true
    },
    toggleBookmark:Function
});

</script>

<template>
   <div  v-if="showFooter" class="container flex justify-between mt-4">
       <SocialIcons :recipe="recipe" :toggleBookmark="toggleBookmark" :showSocialIcons/>
   </div>
</template>

<style scoped>

</style>
