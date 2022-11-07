<template>
  <h3 class="text-center mb-4">List of reviews</h3>
  <!-- <h3 class="text-center mb-4">{{ shopName }}</h3> -->
  <div v-for="(review, index) in reviews" :key="index">
    <div class="card m-5">
      <div class="card-body">
        <h5 class="card-title mb-2">{{ review["name"] }}</h5>
        <!-- <h6 class="card-subtitle mb-2 text-muted">
          Rating: {{ review["ratingStars"] }}/5
        </h6> -->
        <star-rating
          :rating="getRatings(index)"
          :read-only="true"
          :increment="0.5"
          :star-size="20"
          class="mb-2"
        />
        <p class="card-text">{{ review["reviewFeedback"] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import StarRating from "vue-star-rating";
import db from "../firebase.js";

export default {
  name: "ReviewsBody",
  components: {
    StarRating,
  },
  props: ["shopName"],
  data() {
    return {
      reviews: [],
    };
  },
  mounted() {
    this.getReviews();
  },
  methods: {
    getReviews() {
      const q = query(
        collection(db.db, "reviews"),
        where("shopName", "==", this.shopName)
      );

      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          this.reviews.push(doc.data());
        });
      });
    },
    getRatings(index) {
      return parseFloat(this.reviews[index]["ratingStars"]);
    },
  },
};
</script>
