<script setup>
import { ref } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Panel from "@/Components/Panel.vue";

const { props } = usePage();

const recipe = ref(props.recipe || {});

// Define the measurement units
const measurementUnits = ref([
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

// Function to convert decimal to fraction
function toFraction(decimal) {
    if (!decimal || decimal % 1 === 0) return decimal.toString();

    const tolerance = 1.0E-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1, b = decimal;

    do {
        let a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

    if (h1 % k1 === 0) {
        return `${h1 / k1}`;
    } else {
        const wholePart = Math.floor(h1 / k1);
        const remainder = h1 % k1;
        if (wholePart === 0) {
            return `${h1}/${k1}`;
        } else if (remainder === 0) {
            return `${wholePart}`;
        } else {
            return `${wholePart} ${remainder}/${k1}`;
        }
    }
}

// Function to convert fraction to decimal
function fractionToDecimal(fraction) {
    if (typeof fraction !== 'string') fraction = fraction.toString();
    const parts = fraction.split(' ');
    let integerPart = 0;
    let fractionPart = fraction;

    if (parts.length > 1) {
        integerPart = parseFloat(parts[0]);
        fractionPart = parts[1];
    }

    const [numerator, denominator] = fractionPart.split('/').map(Number);
    return denominator ? integerPart + (numerator / denominator) : parseFloat(fraction);
}

// Convert quantity from decimal to fraction format
function formatQuantity(value) {
    const decimalValue = parseFloat(value);
    if (!isNaN(decimalValue) && decimalValue % 1 !== 0) {
        return toFraction(decimalValue);
    }
    return value;
}

// Initialize form with default values
const form = ref({
    title: recipe.value.title || '',
    description: recipe.value.description || '',
    instruction: recipe.value.instruction || '',
    image_url: null,
    ingredients: (recipe.value.ingredients || []).map(ingredient => ({
        name: ingredient.name,
        quantity: formatQuantity(ingredient.pivot.quantity), // Convert to fraction on load
        unit: ingredient.pivot.unit
    }))
});

const ingredientError = ref('');

const addIngredient = () => {
    form.value.ingredients.push({ name: '', quantity: '', unit: measurementUnits.value[0] });
    ingredientError.value = ''; // Clear the error when adding an ingredient
};

const removeIngredient = (index) => {
    if (form.value.ingredients.length > 1) {
        form.value.ingredients.splice(index, 1);
    } else {
        ingredientError.value = 'At least one ingredient is required.';
    }
};

const handleImage = (event) => {
    form.value.image_url = event.target.files[0];
};

const validateForm = () => {
    let isValid = true;
    ingredientError.value = '';

    if (form.value.ingredients.length < 1) {
        ingredientError.value = 'At least one ingredient is required.';
        isValid = false;
    }

    form.value.ingredients.forEach(ingredient => {
        if (!ingredient.name || !ingredient.quantity || !ingredient.unit) {
            ingredientError.value = 'All ingredient fields are required.';
            isValid = false;
        }
    });

    return isValid;
};

const submit = () => {
    if (!validateForm()) {
        return;
    }

    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('instruction', form.value.instruction);
    if (form.value.image_url) {
        formData.append('image_url', form.value.image_url);
    }

    formData.append('_method', 'PATCH');
    form.value.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][name]`, ingredient.name);
        formData.append(`ingredients[${index}][quantity]`, fractionToDecimal(ingredient.quantity)); // Convert to decimal before submission
        formData.append(`ingredients[${index}][unit]`, ingredient.unit);
    });
    router.post(`/recipes/${recipe.value.id}`, formData);
};

// Delete function
const deleteRecipe = () => {
    if(confirm('Are you sure you want to delete this recipe')) {
        router.delete(`/recipes/${recipe.value.id}`, {
            onSuccess: () => {
                router.visit('/recipes');
            },
            onError: (errors) => {
                console.log('Recipe deletion failed', errors);
            }
        })
    }
}
</script>

<template>
    <AuthenticatedLayout>
        <div class="p-4">
            <Panel>
                <h1 class="text-2xl font-bold mb-6">Edit your recipe</h1>
                <form @submit.prevent="submit">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Panel class="space-y-4">
                            <label for="title" class="block text-sm font-medium text-gray-700">Recipe Name</label>
                            <input type="text" id="title" v-model="form.title" class="mt-1 p-2 block w-full rounded-xl border-gray-300 shadow-sm"/>

                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" v-model="form.description" class="mt-1 p-2 block w-full rounded-2xl border-gray-300 shadow-sm h-40 resize-none"></textarea>

                            <label for="instruction" class="block text-sm font-medium text-gray-700">Instructions</label>
                            <textarea id="instruction" v-model="form.instruction" class="mt-1 p-2 block w-full rounded-2xl border-gray-300 shadow-sm h-40 resize-none"></textarea>

                            <div class="space-y-6">
                                <label for="image" class="text-sm font-medium text-gray-700">Image</label>
                                <div class="flex justify-between">
                                    <input type="file" id="image" @change="handleImage" class="mt-1 p-2 block w-1/3 rounded-xl border-gray-300 shadow-sm">
                                    <button type="button" @click="deleteRecipe" class="bg-red-700 text-mintGreen py-2 px-4 rounded-lg">Delete</button>
                                </div>
                            </div>
                        </Panel>
                        <Panel>
                            <div class="mb-4 space-y-4">
                                <label class="block text-sm font-medium text-gray-700">Ingredients</label>
                                <div v-for="(ingredient, index) in form.ingredients" :key="index" class="flex flex-wrap items-center mb-2 space-y-2 md:space-y-0">
                                    <input type="text" v-model="ingredient.name" placeholder="Ingredient" class="block w-full md:w-1/4 p-2 flex-1 rounded-xl border-gray-300 shadow-sm mr-2">
                                    <input type="text" v-model="ingredient.quantity" placeholder="e.g., 1 1/2" class="mr-4 p-2 rounded-md border-gray-300 shadow-sm">
                                    <select v-model="ingredient.unit" class="mr-2 p-2 rounded-md border-gray-300 shadow-sm unit-select">
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
