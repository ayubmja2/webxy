<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Panel from "@/Components/Panel.vue";

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
        'Liter (l)'
    ]);

// Define the Quantity

const quantities = ref(['1/4 ', '1/2 ', '1/8 ', '1/16 ', '1', '2', '3',  '4', '5']);


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

const submit = () => {
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
    router.post('/recipes', formData);
};
</script>

<template>
    <AuthenticatedLayout>
        <div class="container mx-auto p-4">
            <Panel>
                <h1 class="text-2xl font-bold mb-4">Post your recipe</h1>
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="title" class="block text-sm font-medium text-gray-700">Recipe Name</label>
                        <input type="text" id="title" v-model="form.title" class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" v-model="form.description" class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="instruction" class="block text-sm font-medium text-gray-700">Instructions</label>
                        <textarea id="instruction" v-model="form.instruction" class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Ingredients</label>
                        <div v-for="(ingredient, index) in form.ingredients" :key="index" class="flex items-center mb-2">
                            <input type="text" v-model="ingredient.name" placeholder="Ingredient" class="mr-2 p-2 flex-1 rounded-md border-gray-300 shadow-sm">

                            <select v-model="ingredient.quantity" class="mr-4 ml-4 p-2 pr-4 pl-6 rounded-md border-gray-300 shadow-sm quantity-select">
                                <option v-for="quantity in quantities " :key="quantity" :value="quantity">{{ quantity }}</option>
                            </select>

                            <select v-model="ingredient.unit" class="mr-2 p-2 rounded-md border-gray-300 shadow-sm unit-select">
                                <option v-for="unit in measurementUnits" :key="unit" :value="unit">{{ unit }}</option>
                            </select>

                            <button type="button" @click="removeIngredient(index)" class="text-red-500">Remove</button>
                        </div>
                        <button type="button" @click="addIngredient" class="bg-blue-500 text-white py-2 px-4 rounded-lg">Add Ingredient</button>
                    </div>
                    <div class="mb-4">
                        <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="image" @change="handleImage" class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg">Submit</button>
                </form>
            </Panel>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.container {
    max-width: 800px;
}
.quantity-select,
.unit-select {
    appearance: none;
    padding-right:1.5rem;
}
</style>
