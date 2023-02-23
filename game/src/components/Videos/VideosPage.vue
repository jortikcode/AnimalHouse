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
      @click="(e) => this.fetchUrls()"
    >
      Cambia video
    </button>

    <div class="flex flex-col items-center gap-y-2" v-show="!this.videoUrl">
      <PacmanLoader color="#ff2a99" />
      <small class="font-bold"> Trovando video buffi... </small>
    </div>
    <iframe 
    class="w-[500px] max-w-full h-96" 
    v-show="!this.loading" 
    :src="this.frameUrl">
    </iframe>

    <video
      class="p-2 w-[500px] max-w-full"
      :v-show="!this.loading"
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
const baseUrl = "https://random.dog/";
const youtubeLinks = [
  "sD9gTAFDq40",
  "d8F2Mq9m8MM",
  "ge3wMsmpT7U",
  "p9uU4DlzUgY",
  "ImGWZYY3yeI",
  "0Haxy5PvCuk",
  "sjoepLlVL6o",
  "PTEV70e9uIY",
  "Jdy7xmmzPpE",
  "0UhVwaPfhHM",
  "kEkSwIN6Yns",
  "mUHd0PqWQ9Y",
  "lyMt4Nq6Js8",
  "16rgX8xXIf4",
  "gPreBJvnnx0",
];

const getRandomYoutubeVideo = () => {
  const randomVideoIndex = Math.floor(Math.random() * youtubeLinks.length);
  return (
    "https://www.youtube.com/embed/" +
    youtubeLinks[randomVideoIndex] +
    "?autoplay=1&mute=1"
  );
};

export default {
  name: "VideosPage",
  components: {
    PacmanLoader,
  },
  data() {
    return {
      videoUrl: "",
      frameUrl: "",
      loading: true,
    };
  },
  async mounted() {
    await this.fetchUrls();
  },
  methods: {
    async fetchUrls() {
      this.loading = true;
      this.videoUrl = "";
      this.frameUrl = "";
      const response = await fetch(randomDogUrl);
      this.videoUrl = baseUrl + (await response.text());
      this.frameUrl = getRandomYoutubeVideo();
      this.loading = false;
    },
  },
};
</script>
