<template>
  <div id="yellow-bar" class="container-fluid px-5 pt-4">
    <span class="text-start fw-semibold">Hello {{ username }},</span>
    <h1 class="text-start fw-semibold">How have your haircuts been?</h1>
    <div class="d-flex flex-row pt-2">
      <div class="metric rounded-4 d-flex flex-column w-100 p-4 me-2 mb-4">
        <span>Total Value</span>
        <h1 class="pt-3">${{ totalValue }}</h1>
      </div>
      <div class="metric rounded-4 d-flex flex-column w-100 p-4 me-2 mb-4">
        <span>Shops Visited</span>
        <h1 class="pt-3">{{ shopsVisited }}</h1>
      </div>
      <div class="metric rounded-4 d-flex flex-column w-100 p-4 mb-4">
        <span>Total Appointments</span>
        <h1 class="pt-3">{{ appointments.length }}</h1>
      </div>
    </div>
  </div>
  <div class="container-fluid px-5">
    <h3 class="pt-4">Upcoming ({{ upcoming.length }})</h3>
    <AppointmentDisplay
      v-for="appointment in upcoming"
      :key="appointment.id"
      :appointmentData="appointment"
      type="upco"
    />
    <h3 class="mt-4">Past Appointments ({{ pastappointments.length }})</h3>
    <AppointmentDisplay
      v-for="appointment in pastappointments"
      :key="appointment.id"
      :appointmentData="appointment"
      type="past"
      :showReviewModal="showReviewModal"
    />
  </div>
</template>

<script>
import AppointmentDisplay from "./AppointmentDisplay.vue";

import db from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

import { computed } from "vue";
import { useUserStore } from "../stores/users.js";

export default {
  name: "AppointmentsBody",
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
      appointments: [],
      upcoming: [],
      pastappointments: [],
      retrievingData: false,
      totalValue: 0,
      showReviewModal: false,
    };
  },
  methods: {
    async retrieveData() {
      this.retrievingData = true;

      const qAppointments = query(
        collection(db.db, "appointments"),
        where("email", "==", this.userEmail)
      );

      const appSnapshot = await getDocs(qAppointments);
      appSnapshot.forEach((doc) => {
        var docData = doc.data();
        docData.docID = doc.id;
        this.appointments.push(docData);
      });

      var today = new Date();
      this.appointments.forEach((app) => {
        this.totalValue += Number(app.price);
        var start = new Date(app.start);
        if (start > today) {
          this.upcoming.push(app);
        } else {
          this.pastappointments.push(app);
        }
      });

      function compareDates(a, b) {
        if (new Date(a.start) > new Date(b.start)) {
          return 1;
        } else {
          return -1;
        }
      }

      this.upcoming.sort(compareDates);
      this.pastappointments.sort(compareDates);
      console.log(this.pastappointments);
      this.retrievingData = false;
    },
  },
  computed: {
    shopsVisited() {
      var uniqueShops = new Set();
      this.appointments.forEach((app) => {
        if (!uniqueShops.has(app.shopName)) {
          uniqueShops.add(app.shopName);
        }
      });
      return uniqueShops.size;
    },
  },
  components: {
    AppointmentDisplay,
  },
  mounted() {
    this.retrieveData();
  },
};
</script>

<style lang="scss" scoped>
#yellow-bar {
  background-color: $pastel-yellow;
}

.metric {
  background-color: black;
  color: white;
  border-radius: 4;
}
</style>
