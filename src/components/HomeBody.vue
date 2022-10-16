<template>
  <div class="container-fluid vh-100">
    <div class="row align-items-center vh-100">
      <div class="col-md-6 align-self-center">
        <h1 class="text-center">Cut Your Hair Today</h1>
        <button
          type="button"
          class="hover-button button mt-4 mb-4 mx-auto d-block"
          v-on:click="$router.push('/login')"
        >
          Get Started
        </button>
      </div>
      <div class="col-md-6 align-self-center text-center">
        <img class="img-fluid" src="../assets/main-image.PNG" alt="..." />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBody",
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 60px;
}
</style>
