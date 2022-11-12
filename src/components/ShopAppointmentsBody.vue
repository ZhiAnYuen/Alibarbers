<template>
  <AppointmentModal :showModal="showModal" @close="showModal = false">
    <template v-slot:header>
      <h3>Appointment Details</h3>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <span class="field-title">Date & Time</span><br />
        <span class="field-details">{{ computedEventDate }}</span>
      </div>
      <hr />
      <span class="field-title">Customer Information</span><br />
      <span class="field-details">Name: {{ popUpEventModal.title }}</span
      ><br />
      <span class="field-details">Email: {{ popUpEventModal.email }}</span>
      <hr />
      <span class="field-title">Selected Services</span><br />
      <div
        v-for="service in popUpEventModal.selectedServices"
        :key="service.id"
        class="d-flex flex-row field-details"
      >
        {{ service.name }} ({{ service.duration }} min)
        <span class="ms-auto">${{ service.price }} </span>
      </div>
      <hr />
      <div class="d-flex flex-row field-details">
        Total Amount
        <span class="ms-auto">${{ popUpEventModal.price }}</span>
      </div>
      <div class="d-flex flex-row field-details">
        Total Duration
        <span class="ms-auto">{{ popUpEventModal.duration }} min</span>
      </div>
    </template>
  </AppointmentModal>
  <div class="container-fluid">
    <div class="row justify-content-center m-5">
      <div class="col card border border-dark rounded-4 p-5">
        <div class="row px-0 gy-5">
          <div class="col-lg-4 col-md-12">
            <VueCal
              xsmall
              hide-view-selector
              :disable-views="['years', 'year', 'week', 'day']"
              active-view="month"
              @cell-focus="this.selectedCalendarDate = $event"
              :minCellWidth="200"
              :events="appointmentsData"
              :editable-events="{
                title: true,
                drag: false,
                resize: false,
                delete: true,
                create: false,
              }"
              style="height: 400px"
            />
          </div>
          <div class="col-lg-8 col-md-12">
            <VueCal
              :disable-views="['years', 'year', 'month', 'week']"
              hide-view-selector
              active-view="day"
              :minCellWidth="400"
              :events="appointmentsData"
              today-button
              :editable-events="{
                title: false,
                drag: true,
                resize: false,
                delete: true,
                create: true,
              }"
              :selected-date="selectedCalendarDate"
              :on-event-click="onCalendarEventClick"
              :split-days="shopHairdressers"
              style="max-height: 100vh; width: 100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

import AppointmentModal from "./AppointmentModal.vue";

import db from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  name: "ShopAppointmentsBody",
  data() {
    return {
      retrievingData: false,
      appointmentsData: [],
      selectedCalendarDate: new Date(),
      shopData: undefined,
      shopHairdressers: undefined,
      shopServices: undefined,
      showModal: false,
      popUpEventModal: {},
      computedEventDate: undefined,
    };
  },
  components: {
    VueCal,
    AppointmentModal,
  },
  methods: {
    async retrieveData() {
      this.retrievingData = true;

      const qAppointments = query(
        collection(db.db, "appointments"),
        where("shopName", "==", "Test Shop")
      );

      const appSnapshot = await getDocs(qAppointments);
      appSnapshot.forEach((doc) => {
        var docData = doc.data();
        docData.docID = doc.id;
        this.appointmentsData.push(docData);
      });

      const qShop = query(
        collection(db.db, "shop"),
        where("shopName", "==", "Test Shop")
      );

      const shopSnapshot = await getDocs(qShop);
      shopSnapshot.forEach((doc) => {
        var shopData = doc.data();
        this.shopData = shopData;
        this.shopHairdressers = shopData.hairdressers;
        this.shopServices = shopData.services;
      });

      this.retrievingData = false;
      console.log(this.appointmentsData);
    },
    onCalendarEventClick(event, e) {
      this.popUpEventModal = event;
      this.showModal = true;

      e.stopPropagation();
      console.log(event);

      var startDate = new Date(this.popUpEventModal.start);
      var endDate = new Date(this.popUpEventModal.end);
      this.computedEventDate =
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
        String(endDate.getMinutes()).padStart(2, "0");
    },
  },
  mounted() {
    this.retrieveData();
  },
};
</script>
