<template>
  <main>
    <HomeHeader />
    <AuthBody />
  </main>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
import AuthBody from "../components/AuthBody.vue";

export default {
  components: {
    HomeHeader,
    AuthBody,
  },
};
</script>
