<template>
  <div class="container-fluid">
    <div class="row mb-5" id="shopHeader">
      <div
        class="col-md-5 p-5 d-flex justify-content-center align-items-center"
      >
        <img :src="shopDetails['imgLink']" id="shopImg" class="img-fluid" />
      </div>
      <div class="col-md-6 align-self-center ms-5">
        <h1 class="mt-5">{{ shopDetails["shopName"] }}</h1>
        <p class="mt-4 fs-4 fw-light">Rating: {{ shopDetails["rating"] }}</p>
        <p class="mt-4 fs-4 fw-light">
          Operating hours: {{ shopDetails["open"] }} to
          {{ shopDetails["close"] }}
        </p>
        <p class="mt-4 fs-4 fw-light">{{ shopDetails["location"] }}</p>
        <div class="row">
          <button class="hover-button mt-3 mx-3 mb-5 col-6">Chat</button>
          <button class="hover-button mt-3 mx-3 mb-5 col-6">Book</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <ul class="nav justify-content-center col-8" id="bodyNav">
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isOverview }"
            @click="state = 'Overview'"
            >Overview</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isReviews }"
            @click="state = 'Reviews'"
            >Review</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isServices }"
            @click="state = 'Services'"
            >Services</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isHairdressers }"
            @click="state = 'Hairdressers'"
            >Hairdressers</a
          >
        </li>
      </ul>
      <div v-if="state == 'Overview'" class="m-5 justify-content-center col-8">
        <OverviewBody />
      </div>
      <div v-if="state == 'Reviews'" class="m-5 justify-content-center col-8">
        <ReviewsBody :shopName="shopDetails['shopName']" />
      </div>
      <div v-if="state == 'Services'" class="m-5 justify-content-center col-8">
        <ServicesBody :services="shopDetails['services']" />
      </div>
      <div
        v-if="state == 'Hairdressers'"
        class="m-5 justify-content-center col-8"
      >
        <p><HairdressersBody :hairdressers="shopDetails['hairdressers']" /></p>
      </div>
    </div>
    <!-- <div class="position-fixed bottom-0 end-0 m-5">
      <button class="hover-button">Book</button>
    </div> -->
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase.js";
import OverviewBody from "./OverviewBody.vue";
import ServicesBody from "./ServicesBody.vue";
import HairdressersBody from "./HairdressersBody.vue";
import ReviewsBody from "./ReviewsBody.vue";

export default {
  name: "ShopBody",
  components: {
    OverviewBody,
    ServicesBody,
    ReviewsBody,
    HairdressersBody,
  },
  data() {
    return {
      shopDetails: {},
      state: "Overview",
    };
  },
  mounted() {
    this.getShop();
  },
  methods: {
    getShop() {
      const docRef = doc(db.db, "shop", this.$route.params.id);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          this.shopDetails = docSnap.data();
          // console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      });
    },
    test() {
      console.log(this.shopDetails["imgLink"]);
    },
  },
  computed: {
    isOverview() {
      return this.state === "Overview" ? "active" : "";
    },
    isReviews() {
      return this.state === "Reviews" ? "active" : "";
    },
    isServices() {
      return this.state === "Services" ? "active" : "";
    },
    isHairdressers() {
      return this.state === "Hairdressers" ? "active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
#shopHeader {
  background-color: $pastel-yellow;
}

#shopImg {
  min-width: 300px;
  max-width: 400px;
}

.hover-button {
  width: 100px;
}

#bodyNav {
  border-bottom: solid 1px black;
  // gap: 100px;
}

.nav-link,
.nav-link:hover {
  color: black;
}
.nav-link:hover,
.nav-link.active {
  border-bottom: 3px solid black;
  margin: -1px;
}
</style>
