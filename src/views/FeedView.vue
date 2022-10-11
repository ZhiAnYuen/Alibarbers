<template>
  <main>
    <FeedHeader/>
    <FeedBody/>
  </main>
</template>

<script>
  import FeedHeader from "../components/FeedHeader.vue";
  import FeedBody from "../components/FeedBody.vue";
  
  export default {
  components: {
    FeedHeader,
    FeedBody,
  },
};
</script>