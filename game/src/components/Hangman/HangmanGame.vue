<template>
<div class="flex flex-col mt-9 bg-green-400 p-5 gap-y-4" v-if="word">
    <span class="text-center text-3xl font-bold tracking-tighter mx-auto bg-white p-3 rounded-lg"> Tastiera </span>
    <ul class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-6 px-5">
        <li class="text-center text-xl border bg-pink-500 text-white rounded-lg hover:bg-pink-800" v-for="letter in alphabet">
            <button class="p-2 w-full h-full" type="button">
                {{ letter }}
            </button>
        </li>
    </ul>
</div>
<div class="flex flex-col mt-9" v-else>
Caricando...
</div>
</template>

<script>
import { isLogged } from "../../common/user"
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const getWord = async () => {
    const response = await fetch('https://random-word-form.herokuapp.com/random/animal')
    const word = await response.json()
    return word[0]
}
const winString = "Hai vinto"
const looseString = "Hai perso"
export default{
    name: "HangmanGame",
    data() {
        return {
            word: "",
            typed: [],
            message: "",
            points: 0
        }
    },
    async mounted() {
        this.word = await getWord()
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
        async getWord() {
            const response = await fetch('https://random-word-form.herokuapp.com/random/animal')
            this.word = await response.json()
        },
        clear() {
            this.word = ""
            this.typed = []
            this.message = ""
            this.points = 0
        },
        type(letter) {
            if (this.typed.includes(letter))
                return
            this.typed.push(letter)
            this.points++
            if (this.status === winString){
            }
        }
    }
}
</script>