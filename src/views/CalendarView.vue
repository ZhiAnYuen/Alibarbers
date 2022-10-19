<template>
  <main>
    <Navbar />
    <CalendarBody />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import CalendarBody from "../components/CalendarBody.vue";

export default {
  components: {
    Navbar,
    CalendarBody,
  },
};
</script>
