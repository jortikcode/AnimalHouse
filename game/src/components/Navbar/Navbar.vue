<script setup>
import { ref } from "vue";
import navbarItems from "./navbarItems.json";
const baseMediaUrl = import.meta.env.VITE_BASE_MEDIA_URL;

let visibleMenu = ref(true)
const toggleMenu = (e) => {
    visibleMenu.value = !visibleMenu.value
}
</script>
<template>
  <nav class="border-b-4 bg-heliotrope-400 border-black text-black pt-2 pl-2">
    <img
      :src="`${baseMediaUrl}/black-logo.png`"
      class="w-[250px] max-w-full px-4 py-3 bg-white rounded-lg mb-3"
    />
    <button class="mx-4" @click="toggleMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="{1.5}"
        stroke="currentColor"
        class="w-12 h-12    "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
    </button>
    <ul class="flex flex-col gap-y-3 tracking-wider font-semibold pb-6" :class="visibleMenu ? '' : 'hidden' ">
      <li class="px-3 text-lg" v-for="(item, index) in navbarItems">
        <router-link :to="`${item.link}`" class="w-fit bg-white p-3 rounded block">{{ item.value }}</router-link>
      </li>
    </ul>
  </nav>
</template>
