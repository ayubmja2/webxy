<script setup>
import Panel from "@/Components/Panel.vue";
import {ref} from "vue";



</script>

<template>
    <div class="container mx-auto p-6">
        <Panel>
            <div class="container mx-auto max-h-full">
                <div
                    class="text-center font-medium rounded-2xl bg-orange-400 max-md:bg-transparent md:flex flex-row justify-center max-md:transition duration-300 ease-in-out shadow-2xl dark:shadow-orange-300">
                    <h3 class="text-sm rounded-md max-md:my-2 max-md:block bg-orange-400 md:transition-colors transition-colors duration-300">
                        recipe title</h3>
                </div>
            </div>
            <div class="container mx-auto mt-4">
                <div class="flex max-md:flex-col-reverse max-md:justify-items-center justify-evenly md:space-x-6">
                    <div class="max-md:mt-4 mx-auto">
                        <div class="text-center">
                            <div class="container">
                                <img class="rounded-lg shadow-2xl dark:shadow-orange-500 mb-4"
                                     src="" alt="image">
                                <a
                                    class="bg-orange-400 p-2 font-medium rounded-full">Info</a>
                            </div>
                        </div>
                    </div>
                    <div
                        class="container flex flex-col max-sm:text-sm overflow-hidden text-ellipsis max-sm:line-clamp-1 text-center">
                        <Panel>
                            <p>recipe description</p>
                        </Panel>
                    </div>
                </div>
            </div>

            <div
                class="flex justify-between items-center mt-2 max-sm:hidden max-md:transition duration-600 ease-in-out">
                <div>

                </div>
                <div>

                    <button class="bookmark-btn" >
                        <i class="fa-bookmark bookmark-icon"></i>
                    </button>

                    <i class="far fa-bookmark bookmark-icon"></i>

                </div>
            </div>
        </Panel>
    </div>
</template>

<style scoped>

</style>
