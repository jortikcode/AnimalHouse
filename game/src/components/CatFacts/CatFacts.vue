<template>
  <div class="flex flex-col items-center justify-center mt-9 p-6 gap-y-12" v-if="fact">
      <h1 class="font-bold text-4xl text-center">Sapevi che...</h1>
      <p class="my-2 text-2xl text-center italic">
        {{ fact }}
      </p>
      <button
        @click="e => loadFact()"
        class="text-center md:text-3xl text-xl font-bold tracking-tighter mx-auto bg-green-400 hover:bg-green-600 p-3 rounded-lg"
      >
        Di nuovo
      </button>
  </div>
  <div class="flex flex-col mt-9 items-center gap-y-2" v-else>
    <PacmanLoader color="#ff2a99" />
    <small class="font-bold"> Trovando cose interessanti... </small>
  </div>
</template>
<script>
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
const catFactsUrl = "https://meowfacts.herokuapp.com/";
export default {
  name: "CatFacts",
  data() {
    return {
      fact: "",
    };
  },
  components: {
    PacmanLoader
  },
  async mounted() {
    this.loadFact()
  },
  methods: {
    async loadFact(){
        this.fact = ""
        const response = await fetch(catFactsUrl);
        this.fact = (await response.json()).data[0];
    }
  }
};
</script>
