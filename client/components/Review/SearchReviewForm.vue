<script setup lang="ts">
import { ref } from "vue";

const author = ref("");
const emit = defineEmits(["getReviewsByAuthor"]);
</script>

<template>
  <form @submit.prevent="emit('getReviewsByAuthor', author)" class="pure-form">
    <fieldset>
      <legend>Search by Keyword</legend>
      <input id="author" type="text" v-model="author" placeholder="Username or store" />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
</style>
