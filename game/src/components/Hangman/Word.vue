<template>
  <div>
    <p v-show="props.length > 0">Sbagliati</p>
    <ul>
      <li v-for="(letter, index) in letters">
        {{ correctLetters.includes(letter) ? letter : "" }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Word",
  props: ["letters", "correctLetters"],
};
</script>
