<template>
  <main>
    <FeedHeader />
    <CalendarBody />
  </main>
</template>

<script>
import FeedHeader from "../components/FeedHeader.vue";
import CalendarBody from "../components/CalendarBody.vue";

export default {
  components: {
    FeedHeader,
    CalendarBody,
  },
};
</script>
