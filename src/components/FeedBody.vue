<template>
  <div class="container-fluid">
    <p class="text-start ms-5 mt-5 fw-semibold">Hello {{ name }},</p>
    <h1 class="text-start ms-5 fw-semibold">Get a makeover today!</h1>
    <div class="row mt-5">
      <p class="text-center border">filter row</p>
    </div>
    <FeedBox />
    <!-- <p class="text-center">{{ name }}</p>
    <p class="text-center">{{ email }}</p>
    <p class="text-center">{{ isLoggedIn }}</p>
    <p class="text-center">{{ userType }}</p> -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "../stores/users.js";
import FeedBox from "../components/FeedBox.vue";

export default {
  name: "FeedBody",
  components: {
    FeedBox,
  },
  setup() {
    const user = useUserStore();

    return {
      name: computed(() => user.name),
      email: computed(() => user.email),
      isLoggedIn: computed(() => user.isLoggedIn),
      userType: computed(() => user.userType),
    };
  },
};
</script>
