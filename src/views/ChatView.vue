<template>
  <main class="d-flex align-items-center">
    <ChatBody />
  </main>
</template>

<script>
import ChatBody from "../components/ChatBody.vue";

export default {
  components: {
    ChatBody,
  },
};
</script>

<style lang="scss" scoped>
main {
  background-color: #a7bcff;
  min-height: 100vh;
}
</style>
