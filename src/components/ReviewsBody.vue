<template>
  <div v-for="(review, index) in reviews" :key="index">
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title mb-2">{{ review["name"] }}</h5>
        <star-rating
          :rating="getRatings(index)"
          :read-only="true"
          :increment="0.5"
          :star-size="20"
          class="mb-2"
        />
        <p class="card-text">{{ review["reviewFeedback"] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "ReviewsBody",
  components: {
    StarRating,
  },
  props: ["shopName", "reviews"],
  methods: {
    getRatings(index) {
      return parseFloat(this.reviews[index]["ratingStars"]);
    },
  },
};
</script>
