<script setup>
defineProps({
    currentFollowerSection: String,
    options: Array,
});
const emit = defineEmits(['switch-follower-section']);

const switchFollowerSection = (section) => {
    emit('switch-follower-section', section);
}
</script>

<template>
    <ul class="flex justify-evenly mb-10">
        <li v-for="option in options" :key="option.value">
            <button @click="() => switchFollowerSection(option.value)" :class="{'text-mintGreen' : currentFollowerSection === option.value}" class="bg-gradient-to-b from-darkOrange to-darkOrange rounded-2xl p-1 px-4 shadow-md transition transform">
                {{option.label}}
            </button>
        </li>
    </ul>
</template>

<style scoped>

</style>
