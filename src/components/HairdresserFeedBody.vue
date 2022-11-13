<template>

  <div class="container px-lg-5 px-md-4 px-sm-4 px-4" width="90%">
    <br />
    <span class="text-start fw-semibold custom">Hello {{ name }},</span>
    <h1 class="text-start fw-semibold">Welcome to your Insights Dashboard.</h1>

    <div class="row mt-4" v-if="check == true">
      
      <!-- bookings -->
      <div class="col-md-6 col-12 mb-2 mb-md-0">
        <div
          class="card border border-dark rounded-4 text-center px-4 pt-4"
        >
          <div class="d-flex flex-row justify-content-between">
            <h3 class="fw-semibold">Bookings</h3>
            <img src="../assets/booking.png" class="img-fluid custom-size" />
          </div>
          <canvas id="bookingsChart" class="mt-2"></canvas>
          <div class="card-body text-center">
            Total Bookings: <strong>{{ totalBookings }}</strong>
          </div>
        </div>
      </div>

      <!-- ratings -->
      <div class="col-md-6 col-12">
        <div
          class="card border border-dark rounded-4 text-center px-4 pt-4"
        >
          <div class="d-flex flex-row justify-content-between">
            <h3 class="fw-semibold">Ratings</h3>
            <img src="../assets/rating.png" class="img-fluid custom-size" />
          </div>
          <div class="mt-3 mx-3">
            <canvas id="ratingsChart" class="mt-2"></canvas>
          </div>
          <div class="card-body text-center">
            Average Rating: <strong>{{ averageRating }} stars</strong>
          </div>
        </div>
      </div>

    </div>

    <div class="row mt-2" v-if="check == true">
      
      <!-- Revenue -->
      <div class="col-md-6 col-12 mb-2 mb-md-0">
        <div
          class="card border border-dark rounded-4 text-center px-4 pt-4"
        >
          <div class="d-flex flex-row justify-content-between">
            <h3 class="fw-semibold">Revenue</h3>
            <img src="../assets/revenue.png" class="img-fluid custom-size" />
          </div>
          <canvas id="revenueChart" class="mt-2"></canvas>
          <div class="card-body text-center">
            Average Revenue per Booking: <strong>${{ averageRevenue }}</strong>
            <br />
            Total YTD Revenue: <strong>${{ totalRevenue }}</strong>
          </div>
        </div>
      </div>

      <!-- services -->
      <div class="col-md-6 col-12 mb-2">
        <div
          class="card border border-dark rounded-4 text-center px-4 pt-4"
        >
          <div class="d-flex flex-row justify-content-between">
            <h3 class="fw-semibold">Services</h3>
            <img src="../assets/service.png" class="img-fluid custom-size" />
          </div>
          <div class="my-2 d-flex flex-row justify-content-center">
            <canvas
              class="justify-content-center mt-2"
              id="servicesChart"
            ></canvas>
          </div>
          <div class="card-body text-center">
            Total Services: <strong>{{ totalServices }}</strong>
          </div>
        </div>
      </div>  

    </div>
  </div>

</template>

<script>
import db from "../firebase.js";
import { useUserStore } from "../stores/users.js";
import { computed } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import Chart from "chart.js/auto";

export default {
  name: "HairdresserFeedBody",
  setup() {
    const user = useUserStore();
    return {
      name: computed(() => user.name),
      email: computed(() => user.email),
      isLoggedIn: computed(() => user.isLoggedIn),
      userType: computed(() => user.userType),
      userID: computed(() => user.userID),
    };
  },
  data() {
    return {
      shopdata: {},
      reviews: [],
      shopname: "",
      averageRating: 0,
      appts: [],
      averageRevenue: 0,
      totalRevenue: 0,
      check: false,
      totalBookings: 0,
      totalServices: 0,
    };
  },
  async mounted() {
    // find shopname based on userID
    var docRef = doc(db.db, "shop", this.userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.check = true;
      this.shopname = docSnap.data().shopName;
      this.shopdata = docSnap.data();
      // console.log(this.shopname, this.shopdata);
    } else {
      alert("You have not set up your shop yet!");
      this.$router.push("/createshop");
    }

    if (this.check == true) {
      // find all ratings based on shopName
      var reviewsRef = collection(db.db, "reviews");
      var q2 = query(reviewsRef, where("shopName", "==", this.shopname));
      var querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        this.reviews.push(doc.data());
      });

      //console.log(this.reviews)

      // graph for reviews
      let ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let totalrating = 0;
      for (const review of this.reviews) {
        ratings[review.ratingStars]++;
        totalrating += Number(review.ratingStars);
      }
      let avgRating = (totalrating / this.reviews.length).toFixed(2);
      if (!isNaN(avgRating)) {
        this.averageRating = (totalrating / this.reviews.length).toFixed(2);
      }

      //console.log(ratings);
      //console.log(Object.values(ratings));
      const ctx1 = document.getElementById("ratingsChart");
      const ratingsChart = new Chart(ctx1, {
        type: "bar",
        data: {
          labels: ["1-star", "2-star", "3-star", "4-star", "5-star"],
          datasets: [
            {
              labels: "# of Ratings", // this does not show up
              data: Object.values(ratings),
              backgroundColor: [
                "rgba(255, 0, 0, 0.55)",
                "rgba(255, 171, 120, 0.75)",
                "rgba(255, 255, 120, 0.75)",
                "rgba(211, 255, 120, 0.75)",
                "rgba(154, 255, 120, 0.75)",
              ],
              borderColor: "rgba(0, 0, 0, 1)",
              borderWidth: 1,
              barThickness: 30,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });

      // find all appointments based on shopName
      var appointmentsRef = collection(db.db, "appointments");
      var q3 = query(appointmentsRef, where("shopName", "==", this.shopname));
      var querySnapshot3 = await getDocs(q3);
      querySnapshot3.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        this.appts.push(doc.data());
      });
      this.totalBookings = this.appts.length;

      // getting number of bookings & revenue per month
      // months are hardcoded as 2022 YTD
      let bookings_data = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sept: 0,
        Oct: 0,
        Nov: 0,
      };
      let revenue_data = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sept: 0,
        Oct: 0,
        Nov: 0,
      };
      let regex = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
      ];
      var services_data = {};
      for (var appt of this.appts) {
        let date = new Date(appt.start);
        bookings_data[regex[date.getMonth()]]++;
        revenue_data[regex[date.getMonth()]] += Number(appt.price);
        this.totalRevenue += Number(appt.price);
        for (var ind in appt.selectedServices) {
          this.totalServices += 1;
          if (appt.selectedServices[ind].name in services_data) {
            services_data[appt.selectedServices[ind].name] += 1;
          } else {
            services_data[appt.selectedServices[ind].name] = 1;
          }
          //console.log(appt.selectedServices[ind]);
        }
      }
      let avgRev = (this.totalRevenue / this.appts.length).toFixed(2);
      if (!isNaN(avgRev)) {
        this.averageRevenue = (this.totalRevenue / this.appts.length).toFixed(
          2
        );
      }
      this.totalRevenue = this.totalRevenue.toFixed(2);

      // graph for bookings
      const ctx2 = document.getElementById("bookingsChart");
      const bookingsChart = new Chart(ctx2, {
        type: "line",
        data: {
          labels: Object.keys(bookings_data),
          datasets: [
            {
              label: "Number of Monthly Bookings",
              data: Object.values(bookings_data),
              borderColor: "rgba(255, 210, 76, 0.75)",
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // graph for revenue
      const ctx3 = document.getElementById("revenueChart");
      const revenueChart = new Chart(ctx3, {
        type: "line",
        data: {
          labels: Object.keys(revenue_data),
          datasets: [
            {
              label: "Monthly Revenue",
              data: Object.values(revenue_data),
              borderColor: "rgba(146, 180, 236, 1)",
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // pie chart for services
      let colors = [
        "rgba(255, 0, 0, 0.6)",
        "rgba(146, 180, 236, 0.8)",
        "rgba(255, 171, 120, 0.75)",
        "rgba(255, 255, 120, 0.75)",
        "rgba(255, 230, 154, 0.8)",
      ];
      const ctx4 = document.getElementById("servicesChart");
      const servicesChart = new Chart(ctx4, {
        type: "pie",
        data: {
          labels: Object.keys(services_data),
          datasets: [
            {
              data: Object.values(services_data),
              backgroundColor: colors.splice(
                0,
                Object.keys(services_data).length
              ),
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
      servicesChart.canvas.style.height = '193px';
      servicesChart.canvas.style.width = '194px';
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
h1 {
  background-color: $pastel-yellow;
}
.custom-size {
  height: 43px;
  width: auto;
}
.card {
  padding-left: 5px;
  padding-right: 5px;
}
button.custom {
  background-color: white;
  color: black;
}
button.custom:hover {
  border-color: black;
  background-color: rgba(255, 210, 76, 1);
}
</style>
