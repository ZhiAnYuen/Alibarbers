<template>
  <main class="d-flex">
    <ShopBody />
  </main>
</template>

<script>
import ShopBody from "../components/ShopBody.vue";

export default {
  components: {
    ShopBody,
  },
};
</script>

<style lang="scss" scoped>
main {
  background-color: $pastel-yellow;
  background: linear-gradient(0deg, white 0%, $pastel-yellow 100%);
  height: 35vh;
}
</style>
