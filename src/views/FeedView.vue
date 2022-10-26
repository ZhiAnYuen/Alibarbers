<template>
  <main class="d-flex">
    <FeedBody />
  </main>
</template>

<script>
import FeedBody from "../components/FeedBody.vue";

export default {
  components: {
    FeedBody,
  },
};
</script>

<style lang="scss" scoped>
main {
  background-color: $pastel-yellow;
  height: 40vh;
}
</style>
