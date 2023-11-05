<script setup lang="ts">
import { ref } from "vue";

const store = ref("");
const emit = defineEmits(["getReviewsByStore"]);
</script>

<template>
  <form @submit.prevent="emit('getReviewsByStore', store)" class="pure-form">
    <fieldset>
      <legend>Search by Store</legend>
      <input id="store" type="text" v-model="store" placeholder="Store" />
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
