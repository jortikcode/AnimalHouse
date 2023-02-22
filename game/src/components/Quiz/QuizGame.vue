<template>
  <div class="flex flex-col mt-9 p-5 gap-y-8" v-if="questions.length > 0">
    <vue-basic-alert :duration="400" :closeIn="3000" ref="alert" />

    <h1
      class="font-semibold tracking-tighter text-center text-3xl text-pink-500 rounded-full bg-green-400 w-fit mx-auto p-3"
    >
      Quiz
    </h1>
    <button
      class="text-center md:text-3xl text-xl font-bold tracking-tighter mx-auto bg-green-400 p-3 rounded-lg"
      @click="(e) => loadQuiz()"
      type="button"
    >
      Nuovo quiz
    </button>
    <div class="grid grid-cols-1 md:grid-cols-3">
    </div>
  </div>
  <div class="flex flex-col mt-9 items-center gap-y-2" v-else>
    <PacmanLoader color="#ff2a99" />
    <small class="font-bold"> Forumulando quiz difficilissimi... </small>
  </div>
</template>
<script>
import { isLogged, updateScore } from "../../common/user";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import VueBasicAlert from "vue-basic-alert";
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
    "https://opentdb.com/api.php?amount=5&category=27&difficulty=medium&type=multiple"
  );
  let questions = await response.json();
  questions = prepareQuestions(questions.results);
  return questions;
};

export default {
  name: "QuizGame",
  components: {
    PacmanLoader,
    VueBasicAlert,
  },
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      correctGuesses: 0,
    };
  },
  async mounted() {
    await this.loadQuiz();
    console.log(this.questions.length)
  },
  // getter per espressioni complesse, cache-based
  computed: {
    answerColors() {
      if (this.questions[questionIndex].answered)
        if (
          this.questions[questionIndex].correctAnswer ===
          this.questions[questionIndex].answer[answerIndex]
        )
          return "bg-green-500 text-white";
        else return "bg-pink-500 text white";
      else return "bg-white text-black";
    },
  },
  // metodi accessibili
  methods: {
    async loadQuiz() {
      this.clear();
      this.questions = await getQuestions();
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    },
    clear() {
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.correctGuesses = 0;
    },
    answer(questionIndex, answerIndex) {
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
