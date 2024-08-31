<script setup>

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
</script>

<template>
    <AuthenticatedLayout>
        <div class="flex">
            <!-- Left Sidebar -->
            <div class="w-1/5 bg-gray-100 p-4">
                <ul>
                    <li class="py-4">Monday</li>
                    <li class="py-4">Tuesday</li>
                    <!-- Add more days -->
                </ul>
            </div>

            <!-- Middle Section (Meal Planner Grid) -->
            <div class="w-3/5 bg-white p-4 grid grid-cols-7 gap-4">
                <!-- Example of a Day Column with Meals -->
                <div>
                    <h3 class="text-center">Monday</h3>
                    <div class="bg-gray-200 p-4 rounded mt-2">Breakfast</div>
                    <div class="bg-gray-200 p-4 rounded mt-2">Lunch</div>
                    <!-- Add more meals -->
                </div>
                <!-- Add more columns for other days -->
            </div>

            <!-- Right Sidebar (Recipe List/Search) -->
            <div class="w-1/5 bg-gray-100 p-4">
                <input class="w-full p-2 mb-4" type="text" placeholder="Search Recipes...">
                <div class="bg-white p-4 rounded mb-4">
                    <!-- Example Recipe Card -->
                    <div class="bg-gray-200 p-4 rounded">
                        Recipe Name
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>

<style scoped>

</style>
