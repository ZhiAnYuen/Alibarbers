<template>
  <main>
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
  width: 100%;
  min-height: 100vh;
}
</style>
