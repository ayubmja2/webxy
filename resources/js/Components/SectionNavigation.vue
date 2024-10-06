<script setup>

defineProps({
    currentSection: String,
    options: Array,
});

const emit = defineEmits(['switch-section']);
const switchSection = (section) => {
    emit('switch-section', section)
};

</script>

<template>
    <ul class="flex justify-evenly items-center">
        <li v-for="option in options" :key="option.value">
            <button @click="() => switchSection(option.value)" :class="{'text-mintGreen' : currentSection === option.value}" class="bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform">
                {{option.label}}
            </button>
        </li>
    </ul>
</template>

<style scoped>

</style>
