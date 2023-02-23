<template>
  <div class="justify-center flex flex-col items-center gap-y-12 mt-16">
    <h1
      class="font-semibold tracking-tighter text-center text-3xl text-pink-500 rounded-full bg-green-400 w-fit mx-auto p-3"
    >
      Video buffi
    </h1>

    <button
      class="text-center md:text-3xl text-xl font-bold tracking-tighter mx-auto bg-green-400 hover:bg-green-600 p-3 rounded-lg"
      type="button"
      @click="(e) => this.fetchUrl()"
    >
      Nuovo video
    </button>

    <div class="flex flex-col items-center gap-y-2" v-show="!this.videoUrl">
      <PacmanLoader color="#ff2a99" />
      <small class="font-bold"> Trovando video buffi... </small>
    </div>

    <video
      class="p-2 w-[500px] max-w-full"
      :v-show="this.videoUrl"
      autoplay
      loop
      :src="this.videoUrl"
      controls
    >
      Your browser does not support the video tag.
    </video>


  </div>
</template>
<script>
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
/* https://github.com/AdenFlorian/random.dog */
const randomDogUrl = "https://random.dog/woof?include=mp4,webm";
const baseUrl = "https://random.dog/"

export default {
  name: "VideosPage",
  components: {
    PacmanLoader,
  },
  data() {
    return {
      videoUrl: "",
    };
  },
  async mounted() {
    await this.fetchUrl();
    console.log(this.videoUrl);
  },
  methods: {
    async fetchUrl() {
      this.videoUrl = ""
      const response = await fetch(randomDogUrl);
      this.videoUrl = baseUrl + (await response.text());
    },
  },
};
</script>
