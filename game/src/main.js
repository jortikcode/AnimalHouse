import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from 'vue-router'
import "./assets/main.css";

import MemoryGame from './components/Memory/MemoryGame.vue'
import QuizGame from './components/Quiz/QuizGame.vue'
import HangmanGame from './components/Hangman/HangmanGame.vue'
import VideosPage from './components/Videos/VideosPage.vue'
import ShowcasePage from './components/Showcase/ShowcasePage.vue'
import CatFacts from './components/CatFacts/CatFacts.vue'

const prefix = "/game"

export const MemoryGameRoute = prefix + '/games/memory'
export const QuizGameRoute = prefix + '/games/quiz'
export const HagmanRoute = prefix + '/games/hangman'
export const VideosRoute = prefix + '/games/videos'
export const CuriositiesRoute = prefix + '/games/curiosities'
export const ShowcaseRoute = prefix + '/showcase'

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
      path: VideosRoute,
      component: VideosPage
    },
    {
      path: CuriositiesRoute,
      component: CatFacts
    },
    {
      path: ShowcaseRoute,
      component: ShowcasePage,
      alias: prefix
    },
  ]
});

const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount("#app");
// Now the app has started!
