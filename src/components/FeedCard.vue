<template>
  <div class="card feedcard">
    <img :src="imgLink" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <div class="card-text" v-if="!isNaN(averageRating)">
        <star-rating
          :rating="averageRating"
          :read-only="true"
          :inline="true"
          :increment="0.5"
          :show-rating="true"
          :star-size="20"
        />
        ({{ ratingCount }})
      </div>
      <div v-else>Not Yet Reviewed</div>
    </div>
    <span @click="routeShop" class="stretched-link"></span>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "FeedCard",
  props: ["imgLink", "name", "ratingSum", "ratingCount", "id"],
  methods: {
    routeShop() {
      this.$router.push({ path: "/shop/" + this.id });
    },
  },
  components: {
    StarRating,
  },
  computed: {
    averageRating() {
      return (this.ratingSum / this.ratingCount).toFixed(1);
    },
  },
};
</script>

<style>
.card-img-top {
  width: 100%;
  height: 10vw;
  object-fit: contain;
  min-height: 150px;
}
</style>
