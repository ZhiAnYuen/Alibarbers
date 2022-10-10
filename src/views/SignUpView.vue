<template>
  <main>
    <HomeHeader />
    <SignUpBody />
  </main>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
import SignUpBody from "../components/SignUpBody.vue";

export default {
  components: {
    HomeHeader,
    SignUpBody,
  },
};
</script>
