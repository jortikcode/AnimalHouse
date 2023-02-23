<template>
  <vue-basic-alert :duration="400" :closeIn="3000" ref="alert" />
  <div
    class="flex flex-col mt-9 p-5 gap-y-8"
    v-if="questions.length > 0 && currentQuestionIndex < maxQuestions"
  >
    <h1
      class="font-semibold tracking-tighter text-center text-3xl text-pink-500 rounded-full bg-green-400 w-fit mx-auto p-3"
    >
      Quiz
    </h1>
    <div
      class="flex flex-col items-center"
      v-show="currentQuestionIndex < maxQuestions"
    >
      <p
        class="p-4 bg-pink-400 font-bold text-lg rounded-lg text-white w-[500px] max-w-full"
      >
        <span class="text-amber-200">Domanda:</span>
        {{ questions[currentQuestionIndex].question }}
      </p>
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 w-[500px] max-w-full py-3 gap-3"
      >
        <li
          class=""
          v-for="(answer, index) in questions[currentQuestionIndex].answers"
          :key="index"
        >
          <button
            :class="`text-center py-5 font-bold border-4 w-full h-full ${this.answerColors(
              currentQuestionIndex,
              index
            )}`"
            type="button"
            @click="(e) => this.answer(currentQuestionIndex, index)"
          >
            {{ answer }}
          </button>
        </li>
      </ul>
      <button
        v-if="currentQuestionIndex < maxQuestions"
        @click="(e) => nextQuestion()"
        type="button"
        class="w-32 mt-7 p-3 bg-heliotrope-500 text-white font-bold tracking-tighter rounded-lg"
      >
        Prossima
      </button>
    </div>
  </div>

  <div
    v-if="currentQuestionIndex === maxQuestions"
    class="flex flex-col items-center gap-y-8 py-12"
  >
    <h2
      class="text-bold text-black bg-heliotrope-400 rounded-full p-3 text-3xl font-bold"
    >
      Risultati
    </h2>
    <div class="flex flex-col bg-yellow-200 p-3">
      <p class="flex flex-row justify-between w-32 items-center">
        <span class="tracking-tighter text-lg">Giuste</span>
        <span class="text-2xl text-green-500 font-bold">{{
          correctGuesses
        }}</span>
      </p>
      <p class="flex flex-row justify-between w-32 items-center">
        <span class="tracking-tighter text-lg">Sbagliate</span>
        <span class="text-2xl text-pink-500 font-bold">
          {{ maxQuestions - correctGuesses }}</span
        >
      </p>
    </div>
    <button
      class="text-center md:text-3xl text-xl font-bold tracking-tighter mx-auto bg-green-400 hover:bg-green-600 p-3 rounded-lg"
      @click="(e) => loadQuiz()"
      type="button"
    >
      Ritenta
    </button>
    <button
      v-show="!saved"
      class="text-center md:text-3xl text-xl font-bold tracking-tighter mx-auto bg-green-400 hover:bg-green-600 p-3 rounded-lg"
      @click="(e) => saveQuiz()"
      type="button"
    >
      Salva
    </button>
  </div>
  <div
    class="flex flex-col mt-9 items-center gap-y-2"
    v-if="questions.length === 0"
  >
    <PacmanLoader color="#ff2a99" />
    <small class="font-bold"> Forumulando quiz difficilissimi... </small>
  </div>
</template>
<script>
import { isLogged, updateScore } from "../../common/user";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import VueBasicAlert from 'vue-basic-alert'
/* 
{
    question: String
    answered: Boolean,
    answers: [String],
    correctAnswer: String,
}
*/
const prepareQuestions = (questions) => {
  return questions.map((apiQuestion) => {
    const n = apiQuestion.incorrect_answers.length;
    const correctAnswerIndex = Math.floor(Math.random() * (n + 1));
    let answers = [];
    let index = 0;
    let insertedElements = 0;
    let correctAnswerInserted = false;
    while (insertedElements < n + 1) {
      if (index === correctAnswerIndex && !correctAnswerInserted) {
        answers.push(apiQuestion.correct_answer);
        correctAnswerInserted = true;
      } else {
        answers.push(apiQuestion.incorrect_answers[index]);
        index++;
      }
      insertedElements++;
    }
    return {
      question: apiQuestion.question,
      answered: false,
      correctAnswer: apiQuestion.correct_answer,
      answers,
    };
  });
};

const getQuestions = async () => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=5&category=27&difficulty=medium&type=multiple`
  );
  let questions = await response.json();
  questions = prepareQuestions(questions.results);
  return questions;
};

export default {
  name: "QuizGame",
  components: {
    PacmanLoader,
    VueBasicAlert
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      correctGuesses: 0,
      maxQuestions: 5,
      saved: false,
    };
  },
  async mounted() {
    await this.loadQuiz();
  },
  // metodi accessibili
  methods: {
    async loadQuiz() {
      this.clear();
      this.questions = await getQuestions();
    },
    async saveQuiz() {
      this.saved = true;
      // Partita conclusa
      if (isLogged()) {
        const scoreToStore = {
          game: "QUIZ",
          score: this.correctGuesses,
        };
        if (await updateScore(scoreToStore)) {
            this.$refs.alert.showAlert(
            "info", // There are 4 types of alert: success, info, warning, error
            "Il tuo punteggio e' stato salvato correttamente.", // Message of the alert
            "Punteggio partita", // Header of the alert
            {
              iconSize: 35, // Size of the icon (px)
              iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
              position: "top right",
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
              position: "top right",
            } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
          );
      } else {
        this.$refs.alert.showAlert(
          "warning", // There are 4 types of alert: success, info, warning, error
          "Il tuo punteggio non e' stato salvato perche' non sei loggato.", // Message of the alert
          "Punteggio partita", // Header of the alert
          {
            iconSize: 35, // Size of the icon (px)
            iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
            position: "top right",
          } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
        );
      }
    },
    answerColors(questionIndex, answerIndex) {
      if (this.questions[questionIndex].answered)
        if (
          this.questions[questionIndex].correctAnswer ===
          this.questions[questionIndex].answers[answerIndex]
        )
          return "bg-green-500 text-black";
        else return "bg-pink-500 text-white";
      else return "bg-white text-black";
    },
    nextQuestion() {
      if (!this.questions[this.currentQuestionIndex].answered)
        this.$refs.alert.showAlert(
          "info", // There are 4 types of alert: success, info, warning, error
          "Hai saltato una domanda, peccato!", // Message of the alert
          "Domanda quiz", // Header of the alert
          {
            iconSize: 35, // Size of the icon (px)
            iconType: "solid", // Icon styles: now only 2 styles 'solid' and 'regular'
            position: "top right",
          } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
        );
      this.currentQuestionIndex++;
    },
    clear() {
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.correctGuesses = 0;
      this.saved = false
    },
    async answer(questionIndex, answerIndex) {
      this.questions[questionIndex].answered = true;
      if (
        this.questions[questionIndex].correctAnswer ===
        this.questions[questionIndex].answers[answerIndex]
      )
        this.correctGuesses++;
    },
  },
};
</script>
