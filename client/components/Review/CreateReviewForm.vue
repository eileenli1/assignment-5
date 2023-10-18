<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const link = ref("");
const emit = defineEmits(["refreshReviews"]);

const createReview = async (link: string, content: string) => {
  try {
    await fetchy("/api/reviews", "POST", {
      body: { link, content },
    });
  } catch (_) {
    return;
  }
  emit("refreshReviews");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createReview(link, content)">
    <label for="link">Review Item Link:</label>
    <textarea id="link" v-model="link" placeholder="Enter the link of the item you're reviewing." required> </textarea>
    <label for="content">Review Contents:</label>
    <textarea id="content" v-model="content" placeholder="Write your review!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Review</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
