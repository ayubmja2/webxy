<script setup>
defineProps({
    bio: String,
    saveBio: Function,
    closeModal: Function,
});

const emit = defineEmits(['update:bio']);

const updateBio = (event) => {
    emit('update:bio', event.target.value); // Emit the update event to change the bio
};

</script>

<template>
    <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <div class="bg-white p-6 rounded-center min-h-screen">
                <h2 class="text-xl mb-4">Edit Bio</h2>
                <textarea :value="bio" @input="updateBio" class="w-full p-2 border rounded mb-4" rows="4"></textarea>
                <button @click="saveBio" class="bg-green-500 text-mintGreen p-2 rounded">Save</button>
                <button @click="closeModal" class="bg-red-500 text-mintGreen p-2 rounded">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
