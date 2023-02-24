<template>
  <div class="flex flex-col items-center justify-center mt-9 p-6 gap-y-12" v-if="facts.length > 0">
      <h1 class="font-bold text-4xl text-center">Sapevi che...</h1>
      <ul class="flex flex-col items-center justify-center list-disc">
        <li v-for="fact in facts">
          <p class="my-2 text-2xl text-center italic">
            {{ fact }}
          </p>
        </li>
      </ul>
      
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
const dogFactsUrl = "https://dog-api.kinduff.com/api/facts?number=1"
export default {
  name: "CatFacts",
  data() {
    return {
      facts: [],
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
        this.facts = []
        let newFacts = []
        let response = await fetch(catFactsUrl);
        newFacts.push((await response.json()).data[0])
        response = await fetch(dogFactsUrl)
        newFacts.push((await response.json()).facts[0])
        this.facts = newFacts
    }
  }
};
</script>
