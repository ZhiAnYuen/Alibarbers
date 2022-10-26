<template>
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
      />
    </div>
  </div>
  <button @click="test">test</button>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase.js";
import FeedCard from "./FeedCard.vue";

export default {
  name: "FeedBox",
  components: {
    FeedCard,
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
        this.feeds = querySnapshot.docs.map((doc) => doc.data());
      });
      this.isLoading = false;
    },
    test() {
      console.log(this.feeds);
    },
  },
};
</script>
