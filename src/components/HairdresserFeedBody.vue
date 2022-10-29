<template>
	<br/>
	<p class="text-start ms-5 fw-semibold">Hello {{ name }},</p>
	<h1 class="text-start ms-5 fw-semibold">Welcome to your Insights Dashboard.</h1>
	
	<div class="card ms-5 m-4 border border-dark rounded-4 text-center">
		<div class="row">
			<div class="col-lg-4 col-md-5 col-sm-12 my-2">
				<h5 class="fw-semibold">Focused View</h5>
				<button type="button" class="btn btn-outline-secondary m-1" @click="reset()">Reset</button>
			</div>
			<div class="col-lg-4 col-md-5 col-sm-12 my-2">
				<h5 class="fw-semibold">Analytics Type</h5>
				<button type="button" class="btn btn-outline-secondary btn-custom m-1" @click="revenue()">Revenue</button>
				<button type="button" class="btn btn-outline-secondary btn-custom m-1" @click="bookings()">Bookings</button>
				<button type="button" class="btn btn-outline-secondary btn-custom m-1" @click="rating()">Ratings</button>
			</div>
			<div class="col-lg-4 col-md-5 col-sm-12 my-2">
				<h5 class="fw-semibold">View Option</h5>
				<!-- <button type="button" class="btn btn-outline-secondary btn-custom m-1">Monthly</button> -->
				<button type="button" class="btn btn-outline-secondary btn-custom m-1" @click="changeView()">Weekly</button>
			</div>
		</div>
	</div>

	<!-- default view -->
	<div class="row ms-1" v-if="timeInterval=='YTD' && showAll==true">
		<!-- revenue -->
		<div class="card col-lg-3 col-md-6 col-sm-12 ms-5 m-4 border border-dark rounded-4 text-center">
			<div class="row justify-content-evenly">
						<div class="col mt-2">
							<h5 class="fw-semibold">Y.t.d<br/>Revenue</h5>
						</div>
						<div class="col">
							<img src="../assets/revenue.png" class="img-fluid custom-size mt-3"/>
						</div>
					</div>
		</div>
		<!-- bookings -->
		<div class="card col-lg-3 col-md-6 col-sm-12 ms-5 m-4 border border-dark rounded-4 text-center">
			<div class="row justify-content-evenly">
						<div class="col mt-2">
							<h5 class="fw-semibold">Y.t.d<br/>Bookings</h5>
						</div>
						<div class="col">
							<img src="../assets/booking.png" class="img-fluid custom-size mt-3"/>
						</div>
					</div>
		</div>
		<!-- ratings -->
		<div class="card col-lg-3 col-md-6 col-sm-12 ms-5 m-4 border border-dark rounded-4 text-center">
			<div class="row justify-content">
						<div class="col mt-2">
							<h5 class="fw-semibold">Y.t.d<br/>Ratings</h5>
						</div>
						<div class="col">
							<img src="../assets/rating.png" class="img-fluid custom-size mt-3"/>
						</div>
					</div>
		</div>
	</div>

	<!-- revenue stats only -->
	<div v-if="showRevenueStats">
		revenue
	</div>

	<!-- rating stats only -->
	<div v-if="showRatingStats">
		rating
	</div>

	<!-- booking stats only -->
	<div v-if="showBookingStats">
		booking
	</div>

	<p class="text-center">{{ email }}</p>

</template>

<script>
	import db from "../firebase.js";
  import { useUserStore } from "../stores/users.js";
  import { computed } from "vue";
	import { collection, query, where, getDocs } from "firebase/firestore";
	import * as d3 from 'd3'

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
				ratings: [
					{ date: '1-10-22', rating: 5 },
					{ date: '3-10-22', rating: 3.5 },
					{ date: '6-10-22', rating: 4 },
					{ date: '11-10-22', rating: 4.5 },
					{ date: '14-10-22', rating: 1 },
					{ date: '15-10-22', rating: 2.5 },
				],
				showAll: true,
				showRevenueStats: false,
				showRatingStats: false,
				showBookingStats: false,
				timeInterval: "YTD", // other options: week, month
			}
		},
		async mounted() {
			var shopsRef = collection(db.db, "shop");
			var q = query(shopsRef, where("shopName", "==", "Test Shop"));
			var querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
			});
		},
		methods: {
			getRatings() {
				getDocs(collection(db.db, "ratings")).then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						let obj = doc.data();
						obj["id"] = doc.id;
          	this.ratings.push(obj);
					});
				});
			},
			changeView() {
				this.timeInterval = "weekly";	
			},
			reset() {
				this.timeInterval = 'YTD';
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
			}
		},
	}
  
</script>

<style lang="scss" scoped>
.btn-custom:active {
  box-shadow: lightslategray;
}
.custom-size {
	height: 35px;
	width: auto;
}
</style>