<template>
  <main>
    <HomeHeader />
    <LoginBody />
  </main>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
import LoginBody from "../components/LoginBody.vue";

export default {
  components: {
    HomeHeader,
    LoginBody,
  },
};
</script>
