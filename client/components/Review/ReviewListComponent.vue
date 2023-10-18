<script setup lang="ts">
import CreateReviewForm from "@/components/Review/CreateReviewForm.vue";
import EditReviewForm from "@/components/Review/EditReviewForm.vue";
import ReviewComponent from "@/components/Review/ReviewComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let reviews = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

async function getReviews(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let reviewResults;
  try {
    reviewResults = await fetchy("/api/reviews", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  reviews.value = reviewResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getReviews();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a review:</h2>
    <CreateReviewForm @refreshReviews="getReviews" />
  </section>
  <div class="row">
    <h2 v-if="!searchAuthor">Reviews:</h2>
    <h2 v-else>Reviews by {{ searchAuthor }}:</h2>
    <SearchPostForm @getReviewsByAuthor="getReviews" />
  </div>
  <section class="reviews" v-if="loaded && reviews.length !== 0">
    <article v-for="review in reviews" :key="review._id">
      <ReviewComponent v-if="editing !== review._id" :review="review" @refreshReviews="getReviews" @editReview="updateEditing" />
      <EditReviewForm v-else :review="review" @refreshReviews="getReviews" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No reviews found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
