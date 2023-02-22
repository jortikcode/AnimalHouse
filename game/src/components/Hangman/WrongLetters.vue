<template>
<div class="flex flex-col items-center gap-y-5">
    <p class="w-fit p-2 bg-pink-500 text-white rounded-lg font-bold tracking-wider" v-show="wrongLetters.length > 0"> Sbagliati </p>
    <ul class="flex flex-wrap gap-y-3 gap-x-3">
        <li class="bg-pink-800 text-white p-2" v-for="(letter, index) in wrongLetters">
            {{ letter }}
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: "WrongLetters",
    props: ["wrongLetters"]
}
</script>