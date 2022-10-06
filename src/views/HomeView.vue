<template>
  <main>
    <HomeHeader />
    <HomeBody />
  </main>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
import HomeBody from "../components/HomeBody.vue";

export default {
  components: {
    HomeHeader,
    HomeBody,
  },
};
</script>
