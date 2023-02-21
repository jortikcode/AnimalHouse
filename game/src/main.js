import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from 'vue-router'
import "./assets/main.css";

import MemoryGame from './components/Memory/MemoryGame.vue'
import QuizGame from './components/Quiz/QuizGame.vue'
import HangmanGame from './components/Hangman/HangmanGame.vue'
import DifferencesGame from './components/Differences/DifferencesGame.vue'
import VideosPage from './components/Videos/VideosPage.vue'
import ShowcasePage from './components/Showcase/ShowcasePage.vue'


export const MemoryGameRoute = '/games/memory'
export const QuizGameRoute = '/games/quiz'
export const HagmanRoute = '/games/hangman'
export const DifferencesGameRoute = '/games/differences'
export const VideosRoute = '/games/videos'
export const ShowcaseRoute = '/showcase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: MemoryGameRoute,
      component: MemoryGame
    },
    {
      path: QuizGameRoute,
      component: QuizGame
    },
    {
      path: HagmanRoute,
      component: HangmanGame
    },
    {
      path: DifferencesGameRoute,
      component: DifferencesGame
    },
    {
      path: VideosRoute,
      component: VideosPage
    },
    {
      path: ShowcaseRoute,
      component: ShowcasePage,
      alias: "/"
    },
  ]
});

const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount("#app");
// Now the app has started!
