<template>
  <div class="flex flex-col mt-9 p-5 gap-y-8" v-if="word">
    <vue-basic-alert :duration="400" :closeIn="3000" ref="alert" />

    <h1
      class="font-semibold tracking-tighter text-center text-3xl text-pink-500 rounded-full bg-green-400 w-fit mx-auto p-3"
    >
      Impiccato
    </h1>
    <button
      class="text-center md:text-3xl text-xl font-bold tracking-tighter mx-auto bg-green-400 p-3 rounded-lg"
      @click="(e) => loadGame()"
      type="button"
    >
      Nuova partita
    </button>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <Figure
        class="col-span-1 md:col-span-2"
        :wrongCount="wrongLetters.length"
      />
      <WrongLetters :wrongLetters="wrongLetters" />
    </div>
    <Word :letters="word" :correctLetters="correctLetters" />
    <span
      v-show="message"
      class="text-center text-3xl font-bold tracking-tighter mx-auto text-pink-500 bg-black p-3 rounded-lg"
    >
      {{ message }}
    </span>
    <span
      v-show="!message"
      class="text-center text-3xl font-bold tracking-tighter mx-auto bg-white p-3 rounded-lg"
    >
      Tastiera
    </span>
    <ul
      v-show="!message"
      class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-6 px-5"
    >
      <li
        class="text-center text-xl border bg-pink-500 text-white rounded-lg hover:bg-pink-800"
        v-for="(letter, index) in alphabet"
      >
        <button
          :key="index"
          class="p-2 w-full h-full"
          type="button"
          @click="(e) => type(letter)"
        >
          {{ letter }}
        </button>
      </li>
    </ul>
  </div>
  <div class="flex flex-col mt-9 items-center gap-y-2" v-else>
    <PacmanLoader color="#ff2a99" />
    <small class="font-bold"> Ricomponendo l'omino... </small>
  </div>
</template>

<script>
import { isLogged, updateScore } from "../../common/user";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import Word from "./Word.vue";
import Figure from "./Figure.vue";
import WrongLetters from "./WrongLetters.vue";
import VueBasicAlert from "vue-basic-alert";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getWord = async () => {
  const response = await fetch(
    "https://random-word-form.herokuapp.com/random/animal"
  );
  const word = await response.json();
  console.log(word[0]);
  return word[0];
};

export default {
  name: "HangmanGame",
  components: {
    PacmanLoader,
    Word,
    Figure,
    WrongLetters,
    VueBasicAlert,
  },
  data() {
    return {
      word: "",
      saved: "",
      typed: [],
      message: "",
      tries: 0,
      winString: "Hai vinto",
      looseString: "Hai perso",
    };
  },
  async mounted() {
    this.loadGame();
  },
  // getter per espressioni complesse, cache-based
  computed: {
    alphabet() {
      return alphabet.split("");
    },
    currentWordLetters() {
      return this.word.split("");
    },
    wrongLetters() {
      return this.typed.filter(
        (typedLetter) => !this.currentWordLetters.includes(typedLetter)
      );
    },
    correctLetters() {
      return this.typed.filter((typedLetter) =>
        this.currentWordLetters.includes(typedLetter)
      );
    },
    status() {
      if (this.wrongLetters.length === 6) return this.looseString;
      else if (
        this.currentWordLetters.every((letter) =>
          this.correctLetters.includes(letter)
        )
      )
        return this.winString;
      else return "";
    },
  },
  // metodi accessibili
  methods: {
    async loadGame() {
      this.clear();
      this.word = (await getWord()).toUpperCase();
    },
    clear() {
      this.word = "";
      this.typed = [];
      this.message = "";
      this.tries = 0;
    },
    async type(letter) {
      if (this.typed.includes(letter)) return;
      this.typed.push(letter);
      this.tries++;
      if (this.status === this.winString) {
        this.message =
          "Hai vinto in " + this.tries + " mosse, rigioca campione!";
        if (isLogged()) {
          const scoreToStore = {
            game: "HANGMAN",
            score: this.tries,
          };
          if ((await updateScore(scoreToStore))){
            this.$refs.alert.showAlert(
              "info", // There are 4 types of alert: success, info, warning, error
              "Il tuo punteggio è stato salvato correttamente.", // Message of the alert
              "Punteggio partita", // Header of the alert
              {
                iconSize: 35, // Size of the icon (px)
                iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
                position: "top left",
              } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
            );
          }else
            this.$refs.alert.showAlert(
              "info", // There are 4 types of alert: success, info, warning, error
              "Il tuo punteggio non è stato salvato perche' non rilevante.", // Message of the alert
              "Punteggio partita", // Header of the alert
              {
                iconSize: 35, // Size of the icon (px)
                iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
                position: "top left",
              } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
            );
        } else{
          this.$refs.alert.showAlert(
            "warning", // There are 4 types of alert: success, info, warning, error
            "Il tuo punteggio non è stato salvato perche' non sei loggato.", // Message of the alert
            "Punteggio partita", // Header of the alert
            {
              iconSize: 35, // Size of the icon (px)
              iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
              position: "top left",
            } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
          );
        }
      } else if (this.status === this.looseString) {
        this.message = "Hai perso, ritenta!";
        this.$refs.alert.showAlert(
          "error", // There are 4 types of alert: success, info, warning, error
          "Hai perso, rigioca!", // Message of the alert
          "Esito partita", // Header of the alert
          {
            iconSize: 35, // Size of the icon (px)
            iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
            position: "top left",
          } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
        );
      }
    },
  },
};
</script>
