<template>
  <div id="page-body" class="container-fluid gx-0">
    <div class="alert alert-danger px-5 col-12" v-if="noSuchAppointment">
      Error: Appointment Not Found
    </div>
    <div v-if="!noSuchAppointment" class="row justify-content-center mx-5">
      <div
        class="col-lg-8 col-md-12 card border border-dark rounded-4 p-5 my-5"
      >
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
          <div class="mt-4">
            <button
              type="button"
              class="btn w-100 border border-dark rounded-4"
              v-if="!addedToGoogleCalendar && !addingToGoogleCalendar"
              @click="addToGoogleCal"
            >
              <img width="40" class="px-1" src="../assets/googleCalendar.png" />
              Add to Google Calendar
            </button>
            <button
              type="button"
              class="btn w-100 border border-dark rounded-4"
              disabled
              v-if="addedToGoogleCalendar"
            >
              <img width="40" class="px-1" src="../assets/googleCalendar.png" />
              Added to your Google Calendar!
            </button>
            <button
              type="button"
              class="btn w-100 border border-dark rounded-4 d-flex justify-content-center align-items-center"
              v-if="addingToGoogleCalendar"
            >
              <div class="spinner-border me-2" role="status"></div>
              Adding to your Google Calendar!
            </button>
          </div>
          <div class="d-flex flex-row">
            <button
              type="button"
              class="hover-button button mt-4 mb-4"
              @click="routeToAppointments()"
            >
              Back
            </button>
            <button
              type="button"
              class="hover-button button mt-4 mb-4 ms-auto"
              @click="deleteAppointmentFromDB()"
            >
              Cancel My Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

const CLIENT_ID =
  "357278563537-alpo25u2cdl470r9p00siu1ub3rhoc6t.apps.googleusercontent.com";
const API_KEY = "AIzaSyDLDs4YzPHLUHXA6eztyjLyntTUZE_-9k8";
const DISCOVERY_DOC = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";

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
      addedToGoogleCalendar: false,
      addingToGoogleCalendar: false,
    };
  },
  methods: {
    async retrieveData() {
      this.retrievingData = true;

      const docSnap = await getDoc(
        doc(db.db, "appointments", this.$route.params.id)
      );

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
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
    addToGoogleCal() {
      this.addingToGoogleCalendar = true;
      this.tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }

        function ISODateString(d) {
          function pad(n) {
            return n < 10 ? "0" + n : n;
          }
          return (
            d.getUTCFullYear() +
            "-" +
            pad(d.getUTCMonth() + 1) +
            "-" +
            pad(d.getUTCDate()) +
            "T" +
            pad(d.getUTCHours()) +
            ":" +
            pad(d.getUTCMinutes()) +
            ":" +
            pad(d.getUTCSeconds()) +
            "Z"
          );
        }

        var startDate = new Date(this.appointmentData.start);
        var endDate = new Date(this.appointmentData.end);
        const googleCalEvent = {
          summary: "Appointment at " + this.appointmentData.shopName,
          start: {
            dateTime: ISODateString(startDate),
            timeZone: "Asia/Singapore",
          },
          end: {
            dateTime: ISODateString(endDate),
            timeZone: "Asia/Singapore",
          },
        };

        const request = window.gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: googleCalEvent,
        });

        request.execute((event) => {
          this.addingToGoogleCalendar = false;
          this.addedToGoogleCalendar = true;
          console.log("Event created:" + event.htmlLink);
        });
      };

      if (window.gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        this.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        this.tokenClient.requestAccessToken({ prompt: "" });
      }
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
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
    });

    window.gapi.load("client", async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOC,
      });
    });

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
