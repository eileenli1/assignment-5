<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import ImageUploader from "./ImageUploader.vue";

const imageContent = ref("");
const emit = defineEmits(["refreshPosts"]);

const createPost = async () => {
  if (imageContent.value) {
    try {
      await fetchy("/api/posts", "POST", {
        body: { content: imageContent.value },
      });
    } catch (_) {
      return;
    }
    emit("refreshPosts");
    emptyForm();
  }
};

const emptyForm = () => {
  imageContent.value = "";
};

const handleImageUpload = (url: string) => {
  imageContent.value = url;
};
</script>

<template>
  <form @submit.prevent="createPost()">
    <label for="content">Post Contents:</label>
    <ImageUploader @uploadImage="handleImageUpload" />
    <button type="submit" class="pure-button-primary pure-button" v-if="imageContent">Create Post</button>
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
