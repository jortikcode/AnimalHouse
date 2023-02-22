<template>
<div class="flex flex-col mt-9 p-5 gap-y-8" v-if="word">
    <div class="grid grid-cols-1 md:grid-cols-3">
        <Figure class="col-span-1 md:col-span-2" :wrongCount="wrongLetters.length" />
        <WrongLetters :wrongLetters="wrongLetters" />
    </div>
    <Word :letters="word" :correctLetters="correctLetters" />

    <span class="text-center text-3xl font-bold tracking-tighter mx-auto bg-white p-3 rounded-lg"> Tastiera </span>
    <ul class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-6 px-5">
        <li class="text-center text-xl border bg-pink-500 text-white rounded-lg hover:bg-pink-800" v-for="letter in alphabet">
            <button class="p-2 w-full h-full" type="button" @click="e => type(letter)">
                {{ letter }}
            </button>
        </li>
    </ul>
    <button class="text-center text-3xl font-bold tracking-tighter mx-auto bg-green-400 p-3 rounded-lg" @click="e => loadGame()" type="button"> Nuova partita </button>
</div>
<div class="flex flex-col mt-9 items-center gap-y-2" v-else>
    <PacmanLoader color="#ff2a99" />
    <small class="font-bold"> Ricomponendo l'omino... </small>
</div>
</template>

<script>
import { isLogged, updateScore } from "../../common/user"
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import Word from "./Word.vue"
import Figure from "./Figure.vue"
import WrongLetters from "./WrongLetters.vue"

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const getWord = async () => {
    const response = await fetch('https://random-word-form.herokuapp.com/random/animal')
    const word = await response.json()
    console.log(word[0])
    return word[0]
}
const winString = "Hai vinto"
const looseString = "Hai perso"

export default{
    name: "HangmanGame",
    components: {
        PacmanLoader,
        Word,
        Figure,
        WrongLetters
    },
    data() {
        return {
            word: "",
            saved: "",
            typed: [],
            message: "",
            tries: 0
        }
    },
    async mounted() {
        this.loadGame()
    },
    // getter per espressioni complesse, cache-based
    computed: {
        alphabet() {
            return alphabet.split('')
        },
        currentWordLetters() {
            return this.word.split('')
        },
        wrongLetters() {
            return this.typed.filter(typedLetter => !this.currentWordLetters.includes(typedLetter))
        },
        correctLetters() {
            return this.typed.filter(typedLetter => this.currentWordLetters.includes(typedLetter))
        },
        status() {
            if (this.wrongLetters === 6) 
                return looseString
            else if (this.currentWordLetters.every(letter => this.correctLetters.includes(letter))) 
                return winString
            else
                return ""
        }
    },
    // metodi accessibili 
    methods: {
        async loadGame() {
            this.clear()
            this.word = (await getWord()).toUpperCase()
        },
        clear() {
            this.word = ""
            this.saved = ""
            this.typed = []
            this.message = ""
            this.tries = 0
        },
        async type(letter) {
            if (this.typed.includes(letter))
                return
            this.typed.push(letter)
            console.log(this.typed)
            console.log(this.wrongLetters)
            this.tries++
            if (this.status === winString){
                this.message = "Hai vinto in " + this.tries + " mosse, rigioca campione!"
                if (isLogged()){
                    const scoreToStore = {
                        game: "hangman",
                        score: this.tries
                    }
                    const response = await updateScore(scoreToStore)
                    console.log(response)
                    this.saved = "Il tuo punteggio e' stato salvato"
                } else
                    this.saved = "Il tuo punteggio non e' stato salvato perche' non sei loggato"

            } else if (this.status === looseString) {
                this.message = "Hai perso, rigioca!"
            }
        }
    }
}
</script>