<script setup>

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Panel from "@/Components/Panel.vue";
import {Link} from "@inertiajs/vue3";
</script>

<template>
    <AuthenticatedLayout>
      <div class="mx-5 mt-20">
          <div class="grid grid-cols-3 gap-2">
              <Panel class="h-lvh">
                  <div class="flex flex-col space-y-4">
                     <div class="flex flex-col text-center font-medium text-2xl text-mintGreen space-y-4 mx-auto">
                         <Link class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Sunday</Link>
                         <Link class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Monday</Link>
                         <Link class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Tuesday</Link>
                         <Link class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Wednesday</Link>
                         <Link class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Thursday</Link>
                         <Link class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Friday</Link>
                         <Link class="p-2 px-20 bg-darkOrange/90 rounded-2xl">Saturday</Link>
                     </div>
                  </div>
              </Panel>

              <Panel>

              </Panel>
              <Panel>3</Panel>
          </div>
      </div>
    </AuthenticatedLayout>
</template>

<style scoped>

</style>
