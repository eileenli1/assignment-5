<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["review"]);
const link = ref(props.review.link);
const content = ref(props.review.content);
const emit = defineEmits(["editReview", "refreshReviews"]);

const editReview = async (link: string, content: string) => {
  try {
    await fetchy(`/api/reviews/${props.review._id}`, "PATCH", { body: { update: { link: link, content: content } } });
  } catch (e) {
    return;
  }
  emit("editReview");
  emit("refreshReviews");
};
</script>

<template>
  <form @submit.prevent="editReview(link, content)">
    <p class="author">{{ props.review.author }}</p>
    <textarea id="link" v-model="link" placeholder="Enter the link of the item you're reviewing." required> </textarea>
    <textarea id="content" v-model="content" placeholder="Create a review!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editReview')">Cancel</button></li>
      </menu>
      <p v-if="props.review.dateCreated !== props.review.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.review.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.review.dateCreated) }}</p>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
