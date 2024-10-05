<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Panel from "@/Components/Panel.vue";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

//setup pusher
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '9ed8ddbfeadd466bd1a2',
    cluster: 'us2',
    encrypted: true,
    forceTLS: true
})

//sub to channel

// const channel = window.Echo.private('recipes');

// Define the measurement units

const measurementUnits = ref(
    [
        'Gram (g)',
        'Kilogram (kg)',
        'Ounce (oz)',
        'Pound (lb)',
        'Teaspoon (tsp)',
        'Tablespoon (tbsp)',
        'Cup (c)',
        'Fluid Ounce (fl oz)',
        'Pint (pt)',
        'Quart (qt)',
        'Gallon (gal)',
        'Milliliter (ml)',
        'Liter (l)',
        'Large',
        'Medium',
        'Small'
    ]);

// Define the Quantity

const quantities = ref(['1/4', '1/2', '1/3', '1', '2', '3']);



const form = ref({
    title: '',
    description: '',
    instruction: '',
    image_url: null,
    ingredients: [{ name: '', quantity: quantities.value[0], unit: measurementUnits.value[0] }],
});

const handleImage = (event) => {
    form.value.image_url = event.target.files[0];
};

const addIngredient = () => {
    form.value.ingredients.push({ name: '', quantity: quantities.value[0], unit: measurementUnits.value[0] });
};

const removeIngredient = (index) => {
    form.value.ingredients.splice(index, 1);
};

// Helper function to get socket ID as a promise
const getSocketId = () => {
    return new Promise((resolve) => {
        if (window.Echo.socketId()) {
            resolve(window.Echo.socketId());
        } else {
            window.Echo.connector.pusher.connection.bind('connected', () => {
                resolve(window.Echo.socketId());
            });
        }
    });
};

const submit = async () => {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('instruction', form.value.instruction);
    if (form.value.image_url) {
        formData.append('image_url', form.value.image_url);
    }
    form.value.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][name]`, ingredient.name);
        formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        formData.append(`ingredients[${index}][unit]`, ingredient.unit);
    });

    try {
        router.post('/recipes', formData);
    } catch (error) {
        console.error('Error getting socket_id:', error);
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <div class="p-4">
            <Panel>
                <h1 class="text-2xl font-bold mb-6">Share your recipe</h1>
                <form @submit.prevent="submit">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Panel class="space-y-4">
                            <label for="title" class="block text-sm font-medium text-gray-700">Recipe Name</label>
                            <input type="text" id="title" v-model="form.title" class="mt-1 p-2 block w-full rounded-xl border-gray-300 shadow-sm"/>

                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" v-model="form.description" class="mt-1 p-2 block w-full rounded-2xl border-gray-300 shadow-sm h-40 resize-none"></textarea>

                            <label for="instruction" class="block text-sm font-medium text-gray-700">Instructions</label>
                            <textarea id="instruction" v-model="form.instruction" class="mt-1 p-2 block w-full rounded-2xl border-gray-300 shadow-sm h-40 resize-none"></textarea>

                            <div class="mb-4">
                                <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                                <input type="file" id="image" @change="handleImage" class="mt-1 p-2 block w-full rounded-xl border-gray-300 shadow-sm">
                            </div>
                        </Panel>
                        <Panel>
                            <div class="mb-4 space-y-4">
                                <label class="block text-sm font-medium text-gray-700">Ingredients</label>
                                <!-- Updated the flex to allow wrapping -->
                                <div v-for="(ingredient, index) in form.ingredients" :key="index" class="flex flex-wrap items-center mb-2 space-y-2 md:space-y-0">
                                    <input type="text" v-model="ingredient.name" placeholder="Ingredient" class="block w-full md:w-1/4 p-2 flex-1 rounded-xl border-gray-300 shadow-sm mr-2">

                                    <!-- Quantity Input Field -->
                                    <input type="text" v-model="ingredient.quantity" placeholder="e.g., 1 3/4" class="block w-full md:w-1/5 p-2 rounded-xl border-gray-300 shadow-sm mr-4">

                                    <select v-model="ingredient.unit" class="block w-full md:w-1/4 p-2 rounded-xl border-gray-300 shadow-sm mr-2">
                                        <option v-for="unit in measurementUnits" :key="unit" :value="unit">{{ unit }}</option>
                                    </select>

                                    <button type="button" @click="removeIngredient(index)" class="text-red-500 ml-2" :disabled="form.ingredients.length === 1">Remove</button>
                                </div>
                                <button type="button" @click="addIngredient" class="bg-darkOrange text-mintGreen py-2 px-4 rounded-lg">Add Ingredient</button>
                            </div>
                        </Panel>
                        <button type="submit" class="mt-4 bg-darkOrange text-mintGreen p-3 px-4 rounded-2xl col-span-2 w-3/4 justify-self-center">Submit</button>
                    </div>
                </form>
            </Panel>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.unit-select {
    min-width: 100px;
}
</style>
