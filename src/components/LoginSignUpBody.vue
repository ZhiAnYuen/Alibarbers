<template>
  <div
    id="login-body"
    class="container-fluid py-5 px-lg-5 px-md-4 px-sm-4 px-4"
  >
    <LoginBox v-if="$route.meta.isLogin" />
    <SignUpBox v-else />
  </div>
</template>

<script>
import LoginBox from "./LoginBox.vue";
import SignUpBox from "./SignUpBox.vue";

export default {
  name: "LoginBody",
  components: {
    LoginBox,
    SignUpBox,
  },
};
</script>

<style lang="scss" scoped></style>
