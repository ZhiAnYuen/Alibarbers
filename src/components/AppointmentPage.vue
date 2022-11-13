<template>
  <div
    id="page-body"
    class="container-fluid px-lg-5 px-md-4 px-sm-3 px-3 py-4 gx-0"
  >
    <div class="alert alert-danger col-12" v-if="noSuchAppointment">
      Error: Appointment Not Found
    </div>
    <div v-if="!noSuchAppointment" class="row justify-content-center">
      <div class="col-lg-8 col-md-12">
        <div class="card border border-dark rounded-4 p-5">
          <h2>Here's your appointment!</h2>
          <div
            v-if="retrievingData"
            class="d-flex justify-content-center align-items-center"
          >
            <div class="spinner-border text-warning" role="status"></div>
          </div>
          <div v-if="!retrievingData">
            <div class="mb-3">
              <span class="field-title">Shop</span><br />
              <span class="field-details">{{ appointmentData.shopName }}</span>
            </div>
            <div class="mb-3">
              <span class="field-title">Address</span><br />
              <span class="field-details">{{ appointmentData.location }}</span>
            </div>
            <div class="mb-3">
              <span class="field-title">Date & Time</span><br />
              <span class="field-details">{{ computedEventDate }}</span>
            </div>
            <div class="mb-3">
              <span class="field-title">Hairdresser</span><br />
              <span class="field-details">{{ selectedHairdresserName }}</span>
            </div>
            <hr />
            <span class="field-title">Selected Services</span>
            <div
              v-for="service in appointmentData.selectedServices"
              :key="service.id"
              class="d-flex flex-row field-details"
            >
              {{ service.name }} ({{ service.duration }} min)
              <span class="ms-auto">${{ service.price }} </span>
            </div>
            <hr />
            <p class="d-flex flex-row field-details">
              Total Amount
              <span class="ms-auto">${{ appointmentData.totalPrice }}</span>
            </p>
            <AddToGoogleCalendar
              :start="appointmentData.start"
              :end="appointmentData.end"
              :shopName="appointmentData.shopName"
            />
            <div class="row">
              <div class="col-lg-6 col-sm-12">
                <button
                  type="button"
                  class="hover-button button mt-4 w-100"
                  @click="routeToAppointments()"
                >
                  Back
                </button>
              </div>
              <div class="col-lg-6 col-sm-12">
                <button
                  type="button"
                  class="hover-button button mt-4 ms-auto w-100"
                  @click="deleteAppointmentFromDB()"
                >
                  Cancel My Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

import AddToGoogleCalendar from "./AddToGoogleCalendar.vue";

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
  name: "AppointmentPage",
  data() {
    return {
      appointmentData: [],
      retrievingData: false,
      noSuchAppointment: false,
      selectedHairdresserName: undefined,
    };
  },
  methods: {
    async retrieveData() {
      this.retrievingData = true;
      const docSnap = await getDoc(
        doc(db.db, "appointments", this.$route.params.id)
      );
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        this.appointmentData = docSnap.data();
        var totalPrice = 0;
        for (var service of this.appointmentData.selectedServices) {
          totalPrice += service.price;
        }
        this.appointmentData["totalPrice"] = totalPrice;
        this.selectedHairdresserName =
          this.appointmentData.selectedHairdresser["name"];
      } else {
        // doc.data() will be undefined in this case
        this.noSuchAppointment = true;
      }
      this.retrievingData = false;
    },
    async deleteAppointmentFromDB() {
      await deleteDoc(doc(db.db, "appointments", this.$route.params.id));
      this.$router.push({ path: "/appointments/" });
    },
    routeToAppointments() {
      this.$router.push({ path: "/appointments/" });
    },
  },
  mounted() {
    this.retrieveData();
  },
  computed: {
    computedEventDate() {
      var startDate = new Date(this.appointmentData.start);
      var endDate = new Date(this.appointmentData.end);
      return (
        String(startDate.getDate()).padStart(2, "0") +
        " " +
        months[startDate.getMonth()] +
        " " +
        startDate.getFullYear() +
        ", " +
        String(startDate.getHours()).padStart(2, "0") +
        ":" +
        String(startDate.getMinutes()).padStart(2, "0") +
        " - " +
        String(endDate.getHours()).padStart(2, "0") +
        ":" +
        String(endDate.getMinutes()).padStart(2, "0")
      );
    },
  },
  components: { AddToGoogleCalendar },
};
</script>

<style lang="scss" scoped>
#page-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
  height: 100%;
  min-height: 100vh;
}
</style>
