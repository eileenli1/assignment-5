<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["review"]);
const emit = defineEmits(["editReview", "refreshReviews"]);
const { currentUsername } = storeToRefs(useUserStore());

const linkPreviewData = ref();

const deleteReview = async () => {
  try {
    await fetchy(`/api/reviews/${props.review._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshReviews");
};

const fetchData = async () => {
  if (props.review.link) {
    try {
      const response = await axios.get(`https://api.linkpreview.net/?q=${props.review.link}&key=c7f10f8dddb43607517c2511d748235e`);
      linkPreviewData.value = response.data;
    } catch (error) {
      console.error("Error fetching link preview:", error);
    }
  }
};
console.log(linkPreviewData);
onMounted(() => {
  if (props.review.link) {
    fetchData().catch((error) => {
      console.log("Error fetching link preview:", error);
    });
  }
});
</script>

<template>
  <div>
    <p class="author">{{ props.review.author }}</p>
    <a :href="props.review.link" target="_blank" rel="noopener noreferrer">
      {{ props.review.link }}
    </a>
    <div v-if="linkPreviewData">
      <p>{{ linkPreviewData.title }}</p>
      <img :src="linkPreviewData.image" alt="Link Preview Image" />
    </div>
    <p>{{ props.review.content }}</p>
    <div class="base">
      <menu v-if="props.review.author == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editReview', props.review._id)">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteReview">Delete</button></li>
      </menu>
      <article class="timestamp">
        <p v-if="props.review.dateCreated !== props.review.dateUpdated">Edited on: {{ formatDate(props.review.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.review.dateCreated) }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
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

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
