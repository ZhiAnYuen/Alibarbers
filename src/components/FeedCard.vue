<template>
  <div class="card">
    <img :src="imgLink" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">Rating: {{ rating }}</p>
    </div>
    <router-link to="#" class="stretched-link" />
  </div>
</template>

<script>
export default {
  name: "FeedCard",
  props: ["imgLink", "name", "rating"],
};
</script>

<style>
.card-img-top {
  width: 100%;
  height: 10vw;
  object-fit: contain;
}
</style>
