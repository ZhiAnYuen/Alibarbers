<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

import db from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const CLIENT_ID =
  "357278563537-alpo25u2cdl470r9p00siu1ub3rhoc6t.apps.googleusercontent.com";
const API_KEY = "AIzaSyDLDs4YzPHLUHXA6eztyjLyntTUZE_-9k8";
const DISCOVERY_DOC = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";

export default {
  name: "CalendarBody",
  data() {
    return {
      step: 1,
      retrievingData: false,
      shopData: undefined,
      hairdressers: undefined,
      services: undefined,
      open: undefined,
      close: undefined,
      appointments: undefined,
      draggable: {
        id: 1,
        title: "My Appointment",
        duration: 60,
        price: 0,
      },
      latestEvent: undefined,
      selectedHairdressers: [],
      selectedServices: [],
      step1To2Alert: false,
      step2To3Alert: false,
      tokenClient: undefined,
      showDraggable: true,
      googleCalendarEventLink: undefined,
      addingToGoogleCalendar: false,
      addedToGoogleCalendar: false,
    };
  },
  methods: {
    async retrieveData() {
      this.retrievingData = true;

      const q = query(
        collection(db.db, "shop"),
        where("shopName", "==", "Test Shop")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        var shopData = doc.data();
        this.shopData = shopData;
        this.hairdressers = shopData.hairdressers;
        this.services = shopData.services;
        this.open = shopData.open;
        this.close = shopData.close;
        this.appointments = shopData.appointments;
      });
      this.retrievingData = false;
    },
    onEventDragStart(e, draggable) {
      e.dataTransfer.setData("event", JSON.stringify(draggable));
      e.dataTransfer.setData("cursor-grab-at", e.offsetY);
    },
    onEventDrop({ external }) {
      if (external) {
        this.showDraggable = false;
      }
    },
    step1To2() {
      if (this.selectedHairdressers.length > 0) {
        this.step += 1;
        this.step1To2Alert = false;
      } else {
        this.step1To2Alert = true;
      }
    },
    step2To3() {
      if (this.selectedServices.length > 0) {
        this.step += 1;
        this.step2To3Alert = false;
        var totalDuration = 0;
        var totalPrice = 0;
        for (var service of this.selectedServices) {
          totalDuration += service.duration;
          totalPrice += service.price;
        }
        this.draggable.duration = totalDuration;
        this.draggable.price = totalPrice;
      } else {
        this.step2To3Alert = true;
      }
    },
    step3To4() {
      this.showDraggable = true;
      if (this.latestEvent) {
        this.step += 1;
        this.appointments.push({
          start: this.latestEvent.start,
          end: this.latestEvent.end,
          split: this.latestEvent.split,
          class: this.hairdressers[this.latestEvent.split - 1].class,
        });
        console.log(this.appointments);
      }
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

        var startDate = new Date(this.latestEvent.start);
        var endDate = new Date(this.latestEvent.end);
        const googleCalEvent = {
          summary: "Appointment at " + this.shopName,
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
    eventInfo(event) {
      this.latestEvent = event;
    },
  },
  components: {
    VueCal,
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
    computedEventStart() {
      var startDate = new Date(this.latestEvent.start);
      return startDate.toLocaleTimeString();
    },
    computedEventEnd() {
      var endDate = new Date(this.latestEvent.end);
      return endDate.toLocaleTimeString();
    },
    computedEventDate() {
      var startDate = new Date(this.latestEvent.start);
      return startDate.toLocaleDateString();
    },
    selectedHairdresser() {
      var result = this.selectedHairdressers.filter(
        (hairdresser) => hairdresser.id === this.latestEvent.split
      );

      return result[0]["label"];
    },
  },
};
</script>

<template>
  <div id="calendar-body" class="container-fluid vh-100">
    <div class="row align-items-center">
      <div class="alert alert-danger col-12" v-if="step1To2Alert">
        Please choose at least 1 hairdresser!
      </div>
      <div class="alert alert-danger col-12" v-if="step2To3Alert">
        Please choose at least 1 service!
      </div>
      <div
        class="col-lg-5 col-md-6 card border border-dark rounded-4 m-5"
        v-if="step === 1"
      >
        <div class="card-body p-5">
          <h2>Step 1: Choose your hairdresser(s)</h2>
          <div
            v-if="retrievingData"
            class="d-flex justify-content-center align-items-center"
          >
            <div class="spinner-border text-warning" role="status"></div>
          </div>
          <div
            v-for="person in hairdressers"
            :key="person.label"
            class="border border-dark rounded-4 p-2 d-flex flex-row my-3"
          >
            <input
              type="checkbox"
              :value="person"
              :id="person.label"
              class="m-3"
              v-model="selectedHairdressers"
            />
            <label :for="person.label"
              ><strong>{{ person.label }}</strong>
              <span class="d-block">{{ person.role }}</span>
            </label>
          </div>
          <button
            type="button"
            class="hover-button button mt-4 mb-4 ms-auto"
            @click="step1To2()"
          >
            Next
          </button>
        </div>
      </div>
      <div
        class="col-lg-5 col-md-6 card border border-dark rounded-4 m-5"
        v-if="step === 2"
      >
        <div class="card-body p-5">
          <h2>Step 2: Choose your service(s)</h2>
          <div
            v-for="service in services"
            :key="service.id"
            class="border border-dark rounded-4 p-2 my-3 d-flex flex-row"
          >
            <input
              type="checkbox"
              :value="service"
              :id="service.id"
              class="mx-3"
              v-model="selectedServices"
            />
            <label :for="service.id">
              <strong>{{ service.name }}</strong></label
            >
            <label :for="service.id" class="ms-auto"
              >${{ service.price }}
            </label>
          </div>
          <div class="d-flex flex-row">
            <button
              type="button"
              class="hover-button button my-4"
              @click="step -= 1"
            >
              Back
            </button>
            <button
              type="button"
              class="hover-button button my-4 ms-auto"
              @click="step2To3()"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div v-if="step === 3" class="row mt-5 px-5">
        <div class="col-lg-4 col-md-12">
          <div class="card border border-dark rounded-4">
            <div class="p-5">
              <h2>
                Step 3: Drag and drop the event below to select your appointment
                time
              </h2>
              <div class="d-flex flex-row justify-content-center py-3">
                <div
                  class="external-event p-2"
                  draggable="true"
                  @dragstart="onEventDragStart($event, draggable)"
                  :key="draggable.id"
                  v-if="showDraggable"
                >
                  <strong>{{ draggable.title }}</strong>
                  <div>
                    {{
                      this.draggable.duration
                        ? `${this.draggable.duration} min`
                        : "no duration"
                    }}
                  </div>
                </div>
              </div>
              <div class="d-flex flex-row">
                <button
                  type="button"
                  class="hover-button button mt-4 mb-4"
                  @click="step -= 1"
                >
                  Back
                </button>
                <button
                  type="button"
                  class="hover-button button mt-4 mb-4 ms-auto"
                  @click="step3To4()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-12">
          <div class="card border border-dark rounded-4 h-0">
            <VueCal
              class="h-50 m-5"
              :disable-views="['years', 'year', 'month']"
              :time-from="10 * 60"
              :time-to="19 * 60"
              :time-step="30"
              :events="appointments"
              :snapToTime="15"
              @event-drop="onEventDrop"
              :editable-events="{
                title: false,
                drag: true,
                resize: false,
                delete: false,
                create: false,
              }"
              @event-mouse-leave="eventInfo($event)"
              :minCellWidth="200"
              :stickySplitLabels="true"
              :split-days="selectedHairdressers"
            />
          </div>
        </div>
      </div>
      <div v-if="step === 4" class="row mt-5 px-5 justify-content-center">
        <div class="col-8 card border border-dark rounded-4">
          <div class="p-5">
            <h2>Here's your appointment!</h2>
            <div class="mb-3">
              <span class="field-title">Shop</span><br />
              <span class="field-details">{{ shopData.shopName }}</span>
            </div>
            <div class="mb-3">
              <span class="field-title">Address</span><br />
              <span class="field-details">{{ shopData.location }}</span>
            </div>
            <div class="mb-3">
              <span class="field-title">Date & Time</span><br />
              <span class="field-details"
                >{{ computedEventDate }}, {{ computedEventStart }} -
                {{ computedEventEnd }}</span
              >
            </div>
            <div class="mb-3">
              <span class="field-title">Hairdresser</span><br />
              <span class="field-details">{{ selectedHairdresser }}</span>
            </div>
            <hr />
            <span class="field-title">Selected Services</span><br />
            <div
              v-for="service in selectedServices"
              :key="service.id"
              class="d-flex flex-row field-details"
            >
              {{ service.name }} ({{ service.duration }} min)
              <span class="ms-auto">${{ service.price }} </span>
            </div>
            <hr />
            <p class="d-flex flex-row field-details">
              Total Amount
              <span class="ms-auto">${{ this.draggable.price }}</span>
            </p>
            <div class="mt-4">
              <button
                type="button"
                class="btn w-100 border border-dark rounded-4"
                v-if="!addedToGoogleCalendar"
                @click="addToGoogleCal"
              >
                <img
                  width="40"
                  class="px-1"
                  src="../assets/googleCalendar.png"
                />
                Add to Google Calendar
              </button>
              <button
                type="button"
                class="btn w-100 border border-dark rounded-4"
                disabled
                v-if="addedToGoogleCalendar"
              >
                <img
                  width="40"
                  class="px-1"
                  src="../assets/googleCalendar.png"
                />
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
                @click="step -= 1"
              >
                Back
              </button>
              <button
                type="button"
                class="hover-button button mt-4 mb-4 ms-auto"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#calendar-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}

.external-event {
  border-top: 4px solid black;
  width: 150px;
  height: 100px;
  background-color: white;
  filter: drop-shadow(5px 5px 4px grey);
}

.vuecal__event {
  background-color: white;
  font-size: 14px;
  border-top: 4px solid black;
}

.vuecal__event.zhi-an {
  border-top: 6px solid $yellow;
}

.vuecal__event.natalie {
  border-top: 6px solid $blue;
}

.field-title {
  font-weight: 600;
  color: #999;
}

.field-details {
  font-weight: 600;
}
</style>
