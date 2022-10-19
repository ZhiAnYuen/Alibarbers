<template>
  <main class="d-flex align-items-center">
    <LoginSignUpBody />
  </main>
</template>

<script>
import LoginSignUpBody from "../components/LoginSignUpBody.vue";

export default {
  components: {
    LoginSignUpBody,
  },
};
</script>

<style lang="scss" scoped>
main {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}

main {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
