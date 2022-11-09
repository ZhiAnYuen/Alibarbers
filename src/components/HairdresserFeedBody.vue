<template>
  <div class="container" width="95%">
    <br/>
    <p class="text-start fw-semibold">Hello {{ name }},</p>
    <h1 class="text-start fw-semibold">
      Welcome to your Insights Dashboard.
    </h1>
    
    <!-- Dashboard -->
    <div class="row justify-content-center">
      <div class="card border border-dark rounded-4 text-center my-3">
        <div class="row">
          <div class="col-md-6 col-sm-12 my-3">
            <h5 class="fw-semibold">Focused View</h5>
            <button
              type="button"
              class="btn btn-outline-secondary m-1"
              @click="reset()"
            >
              Reset
            </button>
          </div>
          <div class="col-md-5 col-sm-12 my-3">
            <h5 class="fw-semibold">Analytics Type</h5>
            <button
              type="button"
              class="btn btn-outline-secondary btn-custom m-1"
              @click="revenue()"
            >
              Revenue
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-custom m-1"
              @click="bookings()"
            >
              Bookings
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-custom m-1"
              @click="rating()"
            >
              Ratings
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Default View -->
    <div class="row g-3 justify-content-evenly" v-if="showAll == true">
        <!-- Revenue -->
        <div class="card col-xl-3 col-md-5 col-sm-12 border border-dark rounded-4 text-center">
          <div class="row justify-content-evenly">
            <div class="col mt-3">
              <h5 class="fw-semibold">Revenue</h5>
            </div>
            <div class="col">
              <img
                src="../assets/revenue.png"
                class="img-fluid custom-size mt-3"
              />
            </div>
          </div>
          <div>
            <canvas id="revenueChart"></canvas>
          </div>
        </div>
        <!-- bookings -->
        <div class="card col-xl-3 col-md-5 col-sm-12 border border-dark rounded-4 text-center">
          <div class="row justify-content-evenly">
            <div class="col mt-3">
              <h5 class="fw-semibold">Bookings</h5>
            </div>
            <div class="col">
              <img
                src="../assets/booking.png"
                class="img-fluid custom-size mt-3"
              />
            </div>
          </div>
          <div>
            <canvas id="bookingsChart"></canvas>
          </div>
        </div>
        <!-- ratings -->
        <div class="card col-xl-3 col-md-5 col-sm-12 border border-dark rounded-4 text-center mb-3">
          <div class="row justify-content-evenly">
            <div class="col mt-3">
              <h5 class="fw-semibold">Ratings</h5>
            </div>
            <div class="col">
              <img
                src="../assets/rating.png"
                class="img-fluid custom-size mt-3"
              />
            </div>
          </div>
          <div>
            <canvas id="ratingsChart"></canvas>
          </div>
        </div>
      </div>

      <!-- revenue stats only -->
      <div v-if="showRevenueStats">revenue</div>

      <!-- rating stats only -->
      <div v-if="showRatingStats">rating</div>

      <!-- booking stats only -->
      <div v-if="showBookingStats">booking</div>

      <p class="text-center">{{ email }}</p>
    </div>



</template>

<script>
import db from "../firebase.js";
import { useUserStore } from "../stores/users.js";
import { computed } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import Chart from 'chart.js/auto'

export default {
  name: "HairdresserFeedBody",
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
      shopdata: {},
      reviews: [],
      showAll: true,
      showRevenueStats: false,
      showRatingStats: false,
      showBookingStats: false,
      shopname: "",
    };
  },
  async mounted() {
    
    // find shopname based on user's email
    var shopsRef = collection(db.db, "shop");
    var q = query(shopsRef, where("ownerEmail", "==", this.email));
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      this.shopname = doc.data().shopName;
      console.log(this.shopname);
    });

    // find all ratings based on shopName
    var reviewsRef = collection(db.db, "reviews");
    var q2 = query(reviewsRef, where("shopName", "==", this.shopname)); 
    var querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      this.reviews.push(doc.data());
    });
    console.log(this.reviews)

    // graph for reviews
    let ratings = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    for (const review of this.reviews) {
      ratings[review.ratingStars] ++;
    }
    console.log(ratings);
    console.log(Object.values(ratings));

    const ctx1 = document.getElementById('ratingsChart');
    const ratingsChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['1-star', '2-star', '3-star', '5-star', '5-star'],
        datasets: [{
          labels: '# of Ratings', // this does not show up
          data: Object.values(ratings),
          backgroundColor: [
            'rgba(255, 0, 0, 0.55)',
            'rgba(255, 171, 120, 0.75)',
            'rgba(255, 255, 120, 0.75)',
            'rgba(211, 255, 120, 0.75)',
            'rgba(154, 255, 120, 0.75)'
          ],
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    })


  },
  methods: {
    reset() {
      this.showRevenueStats = false;
      this.showRatingStats = false;
      this.showBookingStats = false;
      this.showAll = true;
    },
    revenue() {
      this.showAll = false;
      this.showRevenueStats = true;
      this.showRatingStats = false;
      this.showBookingStats = false;
    },
    bookings() {
      this.showAll = false;
      this.showBookingStats = true;
      this.showRevenueStats = false;
      this.showRatingStats = false;
    },
    rating() {
      this.showAll = false;
      this.showRatingStats = true;
      this.showBookingStats = false;
      this.showRevenueStats = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-custom:active {
  box-shadow: lightslategray;
}
.custom-size {
  height: 30px;
  width: auto;
}
.card{
    padding-left: 5px;
    padding-right: 5px;
}
</style>
