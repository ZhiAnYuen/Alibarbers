<template>
  <ReviewModal :showModal="showModal" @close="showModal = false">
    <template v-slot:header>
      <div class="d-flex flex-column w-100">
        <div class="alert alert-danger" :key="error" v-for="error in errors">
          {{ error }}
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="row">
        <div class="col-1" @click="showModal = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </div>
        <div class="col-11">
          <h3>
            You visited {{ appointmentData.shopName }} on {{ appointmentDate }}
          </h3>
        </div>
      </div>
      <div class="my-4">
        <b>Rate Your Experience</b>
        <p>How satisfied were you with the service?</p>
        <div class="rate">
          <input
            type="radio"
            id="star5"
            name="rate"
            value="5"
            v-model="ratingStars"
          />
          <label for="star5" title="text">5 stars</label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            v-model="ratingStars"
          />
          <label for="star4" title="text">4 stars</label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            v-model="ratingStars"
          />
          <label for="star3" title="text">3 stars</label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            v-model="ratingStars"
          />
          <label for="star2" title="text">2 stars</label>
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            v-model="ratingStars"
          />
          <label for="star1" title="text">1 star</label>
        </div>
      </div>
      <hr />
      <div class="my-4">
        <b>What did you like?</b>
        <p></p>
        <div
          class="d-inline me-1"
          v-for="category in categories"
          :key="category"
        >
          <input
            type="checkbox"
            class="btn-check"
            :id="category"
            v-model="likedCategories"
            :value="category"
          />
          <label class="btn btn-outline-primary" :for="category">{{
            category
          }}</label>
        </div>
      </div>
      <hr />
      <div class="my-4">
        <b>Care to Share More?</b>
        <p>
          Tell us more about your experience. What did you enjoy? What can be
          improved?
        </p>
        <textarea
          id="floatingTextarea"
          class="border border-dark rounded-4 p-3 w-100"
          v-model="reviewFeedback"
          placeholder="Type your feedback here"
        ></textarea>
      </div>
    </template>
    <template v-slot:footer>
      <button class="hover-button modal-default-button" @click="submitReview()">
        Submit Review
      </button>
    </template>
  </ReviewModal>
  <div
    class="border border-dark rounded-4 row mx-0 align-items-center p-4 bg-white mb-3"
    @click="routeToAppointment"
  >
    <div class="col-lg-3 col-md-12 d-flex flex-row align-items-center p-2">
      <div class="d-inline">
        <img :src="appointmentData.imgLink" height="50" />
      </div>
      <div class="d-flex flex-column ps-4">
        <span class="shop-name">{{ appointmentData.shopName }}</span>
        <span>{{ appointmentData.location }}</span>
      </div>
    </div>
    <div class="col-lg-3 col-md-12 d-flex flex-row align-items-center p-2">
      <img src="../assets/icons8-planner-24.png" width="32" height="32" />
      <div class="col-9 d-flex flex-column ps-4">
        <span class="upper-row">{{ appointmentDate }}</span>
        <span>{{ appointmentTime }}</span>
      </div>
    </div>
    <div class="col-lg-3 col-md-12 d-flex flex-row align-items-center p-2">
      <img src="../assets/icons8-user-32.png" width="32" height="32" />
      <div class="d-flex flex-column ps-4">
        <span class="upper-row">{{
          appointmentData.selectedHairdresser.name
        }}</span>
        <span>{{ appointmentData.selectedHairdresser.role }}</span>
      </div>
    </div>
    <button
      v-if="type === 'upco'"
      class="col-lg-3 col-md-12 hover-button p-2"
      @click="deleteAppointmentFromDB($event)"
    >
      Cancel
    </button>
    <button
      v-else
      class="col-lg-3 col-md-12 hover-button p-2 review-button"
      @click="openReviewModal($event)"
    >
      Review
    </button>
  </div>
</template>

<script>
import ReviewModal from "./ReviewModal.vue";

import db from "../firebase.js";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

import { computed } from "vue";
import { useUserStore } from "../stores/users.js";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default {
  name: "AppointmentDisplay",
  setup() {
    const user = useUserStore();
    return {
      username: computed(() => user.name),
      userEmail: computed(() => user.email),
      isLoggedIn: computed(() => user.isLoggedIn),
      userType: computed(() => user.userType),
    };
  },
  data() {
    return {
      showModal: false,
      reviewFeedback: "",
      ratingStars: undefined,
      errors: [],
      likedCategories: [],
      categories: [
        "Cleanliness",
        "Professionalism",
        "Punctuality",
        "Quality",
        "Value",
      ],
    };
  },
  props: { appointmentData: Object, type: String },
  computed: {
    appointmentDate() {
      var start = new Date(this.appointmentData.start);
      return (
        start.getDate() +
        " " +
        months[start.getMonth()] +
        " " +
        start.getFullYear()
      );
    },
    appointmentTime() {
      var start = new Date(this.appointmentData.start);
      var end = new Date(this.appointmentData.end);
      return (
        String(start.getHours()).padStart(2, "0") +
        ":" +
        String(start.getMinutes()).padStart(2, "0") +
        " - " +
        String(end.getHours()).padStart(2, "0") +
        ":" +
        String(end.getMinutes()).padStart(2, "0")
      );
    },
  },
  components: {
    ReviewModal,
  },
  methods: {
    async submitReview() {
      if (this.ratingStars === undefined) {
        this.errors.push("Please give a rating.");
      }
      if (this.likedCategories.length === 0) {
        this.errors.push("Please choose something you liked.");
      }
      if (this.reviewFeedback.length === 0) {
        this.errors.push("Please fill in some details about your experience.");
      }
      if (this.errors.length === 0) {
        await addDoc(collection(db.db, "reviews"), {
          ratingStars: Number(this.ratingStars),
          reviewFeedback: this.reviewFeedback,
          email: this.userEmail,
          likedCategories: this.likedCategories,
          shopName: this.appointmentData.shopName,
        });
        alert("Review submitted successfully!");
        this.showModal = false;
      }

      alert("Thank you for your review!");
    },
    routeToAppointment() {
      this.$router.push({ path: "/appointment/" + this.appointmentData.docID });
    },
    openReviewModal(event) {
      this.errors = [];
      this.showModal = !this.showModal;
      event.stopPropagation();
    },
    async deleteAppointmentFromDB(event) {
      event.stopPropagation();
      await deleteDoc(doc(db.db, "appointments", this.appointmentData.docID));
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-name {
  font-weight: 700;
}

.upper-row {
  font-weight: 500;
}

.rate {
  display: inline-block;
  height: 46px;
}

.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 50px;
  line-height: 50px;
  color: #ccc;
}
.rate:not(:checked) > label:before {
  content: "★ ";
}
.rate > input:checked ~ label {
  color: $yellow;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: $yellow;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: $yellow;
}
</style>
