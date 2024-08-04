<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {usePage, Link} from '@inertiajs/vue3';

const {props} = usePage();
const recipe = props.recipe;
</script>

<template>
<AuthenticatedLayout>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">{{recipe.title}}</h1>
        <div class="mb-4">
            <img v-if="recipe.image_url" :src="recipe.image_url" alt="Recipe Image" class="w-full h-auto rounded-lg">
        </div>
        <div class="mb-4">
            <h2>Description</h2>
            <p>{{recipe.description}}</p>
        </div>
        <div class="mb-4">
            <h2 class="text-xl font-bold">Instructions</h2>
            <p>{{recipe.instruction}}</p>
        </div>
        <div class="mb-4">
            <h2 class="text-xl font-bold">Ingredients</h2>
            <ul>
                <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                    {{ingredient.pivot.quantity}} {{ingredient.pivot.unit}} of {{ingredient.name}}
                </li>
            </ul>
        </div>
        <div class="mb-4">
            <h2 class="text-xl font-bold">Categories</h2>
            <ul>
                <li v-for="category in recipe.categories" :key="category.id">{{category.name}}</li>
            </ul>
        </div>
        <Link  v-if="recipe.user_id === props.auth.user.id " :href="`/recipes/${recipe.id}/edit`" class="bg-blue-500 text-white py-2 px-4 rounded-lg">Edit Recipe</Link>
    </div>
</AuthenticatedLayout>
</template>

<style scoped>
.container {
    max-width:800px;
}
</style>
