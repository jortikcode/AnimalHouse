<template>
  <vue-basic-alert :duration="400" :closeIn="3000" ref="alert" />
  <div class="flex flex-col mt-9 p-5 gap-y-8" v-if="!loading">
    <h1
      class="font-semibold tracking-tighter text-center text-3xl text-pink-500 rounded-full bg-green-400 w-fit mx-auto p-3"
    >
      Memoria
    </h1>
  </div>
  <div class="flex flex-col mt-9 items-center gap-y-2" v-else>
    <PacmanLoader color="#ff2a99" />
    <small class="font-bold"> Creando le card... </small>
  </div>
</template>
<script>
import { getAnimalPicture, animalTypes } from "../../common/animalPictures";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import VueBasicAlert from "vue-basic-alert";
import { isLogged } from "../../common/user";

const winString = "Hai vinto";
const stillPlaying = "In corso";
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const createCard = (cards, newImg) => {
  const group = cards.length;
  return [
    ...cards,
    {
      group,
      id: cards.length,
      selected: false,
      imgUrl: newImg,
      guessed: false,
    },
    {
      group,
      id: cards.length + 1,
      selected: false,
      imgUrl: newImg,
      guessed: false,
    },
  ];
};
/*
{
    selected: Boolean,
    image: String,
    id: Number
}
*/
export default {
  name: "MemoryGame",
  components: {
    PacmanLoader,
    VueBasicAlert,
  },
  data: () => {
    return {
      cards: [],
      moves: 0,
      loading: true,
    };
  },
  async mounted() {
    await this.loadGame();
  },
  computed: {
    status() {
      if (this.cards.filter((card) => !card.guessed).length === 0)
        return winString;
      else return stillPlaying;
    },
  },
  methods: {
    async loadGame() {
      this.reset();
      for (const type of animalTypes) {
        this.cards = createCard(this.cards, await getAnimalPicture(type));
      }
      this.cards = shuffleArray(this.cards);
      this.loading = false;
    },
    reset() {
      this.cards = [];
      this.moves = 0;
      this.loading = true;
    },
    async selecCard(id) {
      const cardIndex = this.cards.findIndex((card) => card.id === id);
      if (this.cards[cardIndex].selected || this.cards[cardIndex].guessed)
        return;
      const getAlreadySelected = (justSelectedID) => {
        const alreadySelected = this.cards.filter(
          (card) => card.selected && card.id !== justSelectedID
        );
        if (alreadySelected.length === 0) return undefined;
        else return alreadySelected[0];
      };
      this.moves++;
      this.cards[cardIndex].selected = true;

      const alreadySelected = getAlreadySelected();
      if (alreadySelected !== undefined) {
        // C'e' gia' una carta selezionata
        if (alreadySelected.group === this.cards[cardIndex].group) {
          // E' stata selezionata la carta gemella
          const twinIndex = this.cards.findIndex(
            (card) => card.id === alreadySelected.id
          );
          this.cards[twinIndex].guessed = true;
          this.cards[cardIndex].guessed = true;

          if (this.status === winString) {
            if (isLogged()) {
              const scoreToStore = {
                game: "MEMORY",
                score: this.moves,
              };
              if (await updateScore(scoreToStore)) {
                this.$refs.alert.showAlert(
                  "info", // There are 4 types of alert: success, info, warning, error
                  "Il tuo punteggio e' stato salvato correttamente.", // Message of the alert
                  "Punteggio partita", // Header of the alert
                  {
                    iconSize: 35, // Size of the icon (px)
                    iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
                    position: "top left",
                  } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
                );
              } else
                this.$refs.alert.showAlert(
                  "info", // There are 4 types of alert: success, info, warning, error
                  "Il tuo punteggio non e' stato salvato perche' non rilevante.", // Message of the alert
                  "Punteggio partita", // Header of the alert
                  {
                    iconSize: 35, // Size of the icon (px)
                    iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
                    position: "top left",
                  } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
                );
            } else
              this.$refs.alert.showAlert(
                "warning", // There are 4 types of alert: success, info, warning, error
                "Il tuo punteggio non e' stato salvato perche' non sei loggato.", // Message of the alert
                "Punteggio partita", // Header of the alert
                {
                  iconSize: 35, // Size of the icon (px)
                  iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
                  position: "top left",
                } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
              );
          }
        }
      }
    },
  },
};
</script>
