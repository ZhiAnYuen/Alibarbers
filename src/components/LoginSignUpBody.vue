<template>
  <div id="login-body" class="container-fluid">
    <transition name="fade" mode="out-in">
      <LoginBox v-if="$route.meta.isLogin" />
      <SignUpBox v-else />
    </transition>
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

<style lang="scss" scoped>
#login-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
