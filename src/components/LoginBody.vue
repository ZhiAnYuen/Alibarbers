<template>
  <div id="login-body" class="container-fluid vh-100"></div>
</template>

<script>
export default {
  name: "LoginBody",
};
</script>

<style lang="scss" scoped>
* {
  background-color: $pastel-yellow;
}

#login-body {
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}
</style>
