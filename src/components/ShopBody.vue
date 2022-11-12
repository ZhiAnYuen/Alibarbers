<template>
  <div class="container-fluid px-0">
    <div id="shopHeader">
      <div class="row d-flex flex-row px-5 py-4">
        <div class="d-flex align-items-center col-lg-3 col-md-6 col-xs-12">
          <img
            :src="shopDetails['imgLink']"
            class="shop-image img-fluid w-100"
          />
        </div>
        <div
          class="d-flex flex-column justify-content-between p-5 col-lg-9 col-md-6 col-xs-12"
        >
          <h1>{{ shopDetails["shopName"] }}</h1>
          <span class="mt-2 d-flex flex-row">
            <span class="me-3">{{
              (totalStars / reviews.length).toFixed(1)
            }}</span>
            <star-rating
              :rating="getRatings()"
              :read-only="true"
              :inline="true"
              :increment="0.5"
              :show-rating="false"
              :star-size="20"
            />
            <span class="ms-3">{{ reviews.length }} reviews</span></span
          ><br />
          <div>
            <img
              src="https://img.icons8.com/material/24/000000/time-span.png"
            />
            <span class="ms-3">
              {{ shopDetails["rawOpening"] }} to
              {{ shopDetails["rawClosing"] }}
            </span>
          </div>
          <div>
            <img
              src="https://img.icons8.com/material-rounded/24/000000/marker.png"
            />
            <span class="ms-3">{{ shopDetails["location"] }}</span>
          </div>
          <div class="row mt-4 p-0 gy-2">
            <div class="col-lg-6 col-sm-12">
              <button type="button" class="button hover-button w-100">
                Start a Chat
              </button>
            </div>
            <div class="col-lg-6 col-sm-12">
              <button
                class="button hover-button w-100"
                @click="routeToBooking()"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-5 mt-5 p-0">
      <ul class="nav" id="bodyNav">
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
      <div v-if="state == 'Overview'" class="my-5">
        <OverviewBody />
      </div>
      <div v-if="state == 'Reviews'" class="my-5">
        <ReviewsBody :shopName="shopDetails['shopName']" :reviews="reviews" />
      </div>
      <div v-if="state == 'Services'" class="my-5">
        <ServicesBody :services="shopDetails['services']" />
      </div>
      <div v-if="state == 'Hairdressers'" class="my-5">
        <HairdressersBody :hairdressers="shopDetails['hairdressers']" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../firebase.js";

import StarRating from "vue-star-rating";

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
    StarRating,
  },
  data() {
    return {
      shopDetails: {},
      state: "Overview",
      reviews: [],
      totalStars: 0,
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
          this.getReviews();
        } else {
          console.log("No such document!");
        }
      });
    },
    getReviews() {
      const qReviews = query(
        collection(db.db, "reviews"),
        where("shopName", "==", this.shopDetails.shopName)
      );

      getDocs(qReviews).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var docData = doc.data();
          this.reviews.push(docData);
          this.totalStars += Number(docData.ratingStars);
        });
      });
    },
    getRatings() {
      return (this.totalStars / this.reviews.length).toFixed(1);
    },
    routeToBooking() {
      this.$router.push({ path: "/booking/" + this.$route.params.id });
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

.shop-image {
  min-height: 200px;
  max-height: 300px;
}

.hover-button {
  width: 100px;
}

#bodyNav {
  border-bottom: solid 1px black;
  overflow: hidden;
  flex-wrap: nowrap;
}

.nav-link,
.nav-link:hover {
  color: black;
}
.nav-link:hover,
.nav-link.active {
  border-bottom: 3px solid black;
  margin: -1px;
  font-weight: 600;
}

@media screen and (max-width: 500px) {
  #bodyNav {
    overflow-x: scroll;
  }
}
</style>
