<template>
  <div class="container-fluid">
    <p class="text-start ms-5 mt-5 fw-semibold">Hello {{ name }},</p>
    <h1 class="text-start ms-5 fw-semibold">Get a makeover today!</h1>
    <div class="row mt-5">
      <p class="text-center border">filter row (WIP)</p>
    </div>
    <div class="row mt-3 justify-content-center">
      <div v-if="isLoading" class="col-2 text-center">Loading...</div>
      <div
        v-else
        v-for="feed in feeds"
        :key="feed.id"
        class="col-sm-6 col-md-4 col-lg-2 my-2"
      >
        <FeedCard
          :imgLink="feed.imgLink"
          :name="feed.shopName"
          :rating="feed.rating"
          :id="feed.id"
        />
      </div>
    </div>
    <button @click="test">test</button>
  </div>
</template>

<script lang="js">
import { computed } from "vue";
import { useUserStore } from "../stores/users.js";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase.js";
import FeedCard from "./FeedCard.vue";

export default {
  name: "FeedBody",
  components: {
    FeedCard,
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
  data() {
    return {
      feeds: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getAllShops();
  },
  methods: {
    getAllShops() {
      getDocs(collection(db.db, "shop")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj["id"] = doc.id;
          this.feeds.push(obj);
        });
      });
      this.isLoading = false;
    },
    test() {
      console.log(this.feeds);
    },
  }
};
</script>
