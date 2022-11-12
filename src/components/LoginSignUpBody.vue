<template>
  <div id="login-body" class="container-fluid">
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
