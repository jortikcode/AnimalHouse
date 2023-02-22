<template>
  <div class="flex flex-col items-center gap-y-5">
    <p class="w-fit p-2 bg-green-400 text-black rounded-lg font-bold tracking-wider" v-show="correctLetters.length > 0"> Corretti </p>
    <ul class="flex flex-wrap gap-x-3 gap-y-3 text-3xl">
      <li v-for="(letter, index) in letters" :key="index" class="flex justify-center p-2 bg-green-400">
        {{ correctLetters.includes(letter) ? letter :  "_" }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Word",
  props: ["letters", "correctLetters"],
};
</script>
