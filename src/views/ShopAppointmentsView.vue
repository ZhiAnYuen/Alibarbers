<template>
  <main class="d-flex">
    <ShopAppointmentsBody />
  </main>
</template>

<script>
import ShopAppointmentsBody from "../components/ShopAppointmentsBody.vue";

export default {
  components: {
    ShopAppointmentsBody,
  },
};
</script>

<style lang="scss" scoped>
main {
  background-color: $pastel-yellow;
  min-height: 100vh;
  height: 100%;
}
</style>
