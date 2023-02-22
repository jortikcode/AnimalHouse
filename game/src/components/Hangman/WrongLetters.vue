<template>
<div>
    <p v-show="props.length > 0"> Sbagliati </p>
    <ul>
        <li v-for="(letter, index) in wrongLetters">
            {{ letter }}
            {{ index === (wrongLetters.length - 1) ? "" : "," }}
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