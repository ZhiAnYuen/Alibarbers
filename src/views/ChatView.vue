<template>
  <main>
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
  background-color: $pastel-yellow;
  height: 100%;
  min-height: 100vh;
}
</style>
