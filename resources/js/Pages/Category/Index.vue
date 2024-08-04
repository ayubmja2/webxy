<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {ref} from "vue";
import {usePage, Link} from "@inertiajs/vue3";
import Panel from "@/Components/Panel.vue";

const {props} = usePage();

const category = ref(props.category);


</script>

<template>
<AuthenticatedLayout>
    <div class="container mx-auto p-4">
       <Panel>
           <div class="grid grid-cols-3 justify-items-end font-medium mb-8">
               <h1 class="col-start-2 justify-self-center">{{category.title}}</h1>
               <div class="relative">
                   <i class="fa-solid fa-ellipsis cursor-pointer" id="ellipsis-icon"></i>
                   <div class="hidden absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20">
                       <Link class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rename</Link>
                       <Link class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</Link>
                   </div>
               </div>
           </div>

           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <!-- Insert recipe card here and loop though -->
           </div>
       </Panel>
    </div>
    <!-- This is the rename Category Modal   -->
    <div class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full flex justify-center items-center">
        <div class="bg-white rounded-lg p-4 relative">
            <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
            <h2 class="text-xl mb-4">Rename Category</h2>
            <form>
                <input type="hidden" value="{{category.id}}">
                <input type="text" class="border p-2 rounded w-full mb-4" required>
                <button type="submit" class="bg-blue-500 text-white p-2 rounded">Rename</button>
            </form>
        </div>
    </div>
</AuthenticatedLayout>
</template>

<style scoped>

</style>
