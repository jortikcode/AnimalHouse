<template>
  <div class="flex flex-col items-center justify-center gap-y-3">
    <p class="text-3xl bg-white rounded-lg p-3 font-bold tracking-tighter"> Omino </p>
    <svg height="250" width="200" class="stroke-pink-500 fill-pink-500">
      <!-- Rod -->
      <line x1="57" y1="20" x2="143" y2="20" stroke-width="6" />
      <line x1="140" y1="20" x2="140" y2="50" stroke-width="5" />
      <line x1="60" y1="20" x2="60" y2="230" stroke-width="5" />
      <line x1="20" y1="230" x2="100" y2="230" stroke-width="5" />

      <!-- Head -->
      <circle v-if="lte(1)" cx="140" cy="70" r="20" />
      <!-- Body -->
      <line v-if="lte(2)" x1="140" y1="90" x2="140" y2="150" stroke-width="4" />
      <!-- Arms -->
      <line v-if="lte(3)" x1="140" y1="120" x2="120" y2="100" stroke-width="4" />
      <line v-if="lte(4)" x1="140" y1="120" x2="160" y2="100" stroke-width="4" />
      <!-- Legs -->
      <line v-if="lte(5)" x1="140" y1="150" x2="120" y2="180" stroke-width="4" />
      <line v-if="lte(6)" x1="140" y1="150" x2="160" y2="180" stroke-width="4" />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["wrongCount"],
  setup(props) {
    const lte = (n) => props.wrongCount >= n;
    return { lte };
  },
};
</script>
