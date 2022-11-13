<template>
  <div id="calendar-body" class="container-fluid gx-0">
    <div
      class="alert alert-danger px-lg-5 px-md-4 px-sm-4 px-4 col-12"
      v-if="step1To2Alert"
    >
      Please choose at least 1 hairdresser!
    </div>
    <div
      class="alert alert-danger px-lg-5 px-md-4 px-sm-4 px-4 col-12"
      v-if="step2To3Alert"
    >
      Please choose at least 1 service!
    </div>
    <div v-if="step < 3" class="row px-lg-5 px-md-4 px-sm-4 px-4">
      <div
        class="col-lg-6 col-md-12 card border border-dark rounded-4 my-5"
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
            :key="person.id"
            class="border border-dark rounded-4 p-2 d-flex flex-row my-3"
          >
            <input
              type="checkbox"
              :value="person"
              :id="person.id"
              class="m-3"
              v-model="selectedHairdressers"
            />
            <label :for="person.id"
              ><strong>{{ person.name }}</strong>
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
        class="col-lg-6 col-md-12 card border border-dark rounded-4 my-5"
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
              :id="service.name"
              class="mx-3"
              v-model="selectedServices"
            />
            <label :for="service.name">
              <strong>{{ service.name }}</strong></label
            >
            <label :for="service.name" class="ms-auto"
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
    </div>
    <div v-if="step === 3" class="row px-lg-5 px-md-4 px-sm-4 px-4">
      <div class="col-lg-4 col-md-12 mt-5">
        <div class="card border border-dark rounded-4 p-5">
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
      <div class="col-lg-8 col-md-12 my-5">
        <div class="card border border-dark rounded-4 p-5">
          <VueCal
            class="h-50"
            :disable-views="['years', 'year', 'month']"
            :time-from="open"
            :time-to="close"
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
    <div
      v-if="step === 4"
      class="row px-lg-5 px-md-4 px-sm-4 px-4 justify-content-center"
    >
      <div
        class="col-lg-8 col-md-12 card border border-dark rounded-4 p-5 my-5"
      >
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
          <span class="field-details">{{ computedEventDate }}</span>
        </div>
        <div class="mb-3">
          <span class="field-title">Hairdresser</span><br />
          <span class="field-details">{{ selectedHairdresser }}</span>
        </div>
        <hr />
        <span class="field-title">Selected Services</span>
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
        <AddToGoogleCalendar
          :start="latestEvent.start"
          :end="latestEvent.end"
          :shopName="shopData.shopName"
        />
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
            @click="addAppointmentToDB()"
          >
            Confirm
          </button>
        </div>
        <StripeCheckout
          ref="checkoutRef"
          mode="payment"
          :pk="publishableKey"
          :line-items="stripeLineItems"
          :success-url="stripeSuccessURL"
          :cancel-url="stripeCancelURL"
          @loading="(v) => (loadingStripe = v)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

import db from "../firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { computed } from "vue";
import { useUserStore } from "../stores/users.js";

import AddToGoogleCalendar from "./AddToGoogleCalendar.vue";

import { StripeCheckout } from "@vue-stripe/vue-stripe";

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
  name: "CalendarBody",
  data() {
    this.publishableKey =
      "pk_test_51M2yabJNfrkeeQDMLASnhqlKK4KZhBn4RpE7eMS6bPjLrqECWRc5YzJRr1KgWuPg1EA78oiz5mOpwpBkp2exI9ge00KhAE9F6G";
    return {
      step: 1,
      retrievingData: false,
      shopData: undefined,
      hairdressers: undefined,
      services: undefined,
      open: undefined,
      close: undefined,
      appointments: [],
      draggable: {
        id: 1,
        title: "My Appointment",
        duration: 60,
      },
      latestEvent: {},
      selectedHairdressers: [],
      selectedServices: [],
      step1To2Alert: false,
      step2To3Alert: false,
      showDraggable: true,
      loadingStripe: false,
      stripeSuccessURL: "http://localhost:5173/appointments",
      stripeCancelURL: "http://localhost:5173/feed",
      stripeLineItems: [],
    };
  },
  setup() {
    const user = useUserStore();
    return {
      userName: computed(() => user.name),
      userEmail: computed(() => user.email),
      isLoggedIn: computed(() => user.isLoggedIn),
      userType: computed(() => user.userType),
    };
  },
  methods: {
    async retrieveData() {
      this.retrievingData = true;

      const shopSnapshot = await getDoc(
        doc(db.db, "shop", this.$route.params.id)
      );

      if (shopSnapshot.exists()) {
        var shopData = shopSnapshot.data();
        //console.log(shopData);
        this.shopData = shopData;
        this.hairdressers = shopData.hairdressers;
        this.services = shopData.services;
        this.open = shopData.open;
        this.close = shopData.close;
      } else {
        //console.log("No such shop");
      }

      const qAppointments = query(
        collection(db.db, "appointments"),
        where("shopName", "==", this.shopData.shopName)
      );

      const appSnapshot = await getDocs(qAppointments);
      appSnapshot.forEach((doc) => {
        this.appointments.push(doc.data());
      });

      this.retrievingData = false;
      //console.log(this.shopData);
      //console.log(this.appointments);
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

      //console.log(this.selectedHairdressers);
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
        console.log(this.draggable);
      } else {
        this.step2To3Alert = true;
      }
      //console.log(this.selectedServices);
    },
    step3To4() {
      this.showDraggable = true;
      if (this.latestEvent) {
        //console.log(this.latestEvent);
        this.step += 1;
      }
    },
    eventInfo(event) {
      this.latestEvent = event;
    },
    async addAppointmentToDB() {
      for (var service of this.selectedServices) {
        this.stripeLineItems.push({
          price: service.stripePriceID,
          quantity: 1,
        });
      }

      // payment succeeds 4242 4242 4242 4242
      // payment requires authentication 4000 0025 0000 3155
      // payment is declined 4000 0000 0000 9995
      this.$refs.checkoutRef.redirectToCheckout();

      function convertToDateString(dateTime) {
        var dateObj = new Date(dateTime);
        return (
          dateObj.getFullYear() +
          "-" +
          String(dateObj.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(dateObj.getDate()).padStart(2, "0") +
          " " +
          String(dateObj.getHours()).padStart(2, "0") +
          ":" +
          String(dateObj.getMinutes()).padStart(2, "0")
        );
      }

      this.draggable.start = convertToDateString(this.latestEvent.start);
      this.draggable.end = convertToDateString(this.latestEvent.end);
      this.draggable.split = this.latestEvent.split;
      this.draggable.class =
        this.hairdressers[this.latestEvent.split - 1].class;
      this.draggable.selectedServices = this.selectedServices;
      this.draggable.selectedHairdresser =
        this.hairdressers[this.latestEvent.split - 1];
      this.draggable.location = this.shopData.location;
      this.draggable.email = this.userEmail;
      this.draggable.imgLink = this.shopData.imgLink;
      this.draggable.title = this.userName;
      delete this.draggable.id;
      this.draggable.shopName = this.shopData.shopName;
      //console.log(this.draggable);

      await addDoc(collection(db.db, "appointments"), this.draggable);
    },
  },
  components: {
    VueCal,
    StripeCheckout,
    AddToGoogleCalendar,
  },
  mounted() {
    this.retrieveData();
  },
  computed: {
    computedEventDate() {
      var startDate = new Date(this.latestEvent.start);
      var endDate = new Date(this.latestEvent.end);
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
    selectedHairdresser() {
      var result = this.selectedHairdressers.filter(
        (hairdresser) => hairdresser.id === this.latestEvent.split
      );

      return result[0]["label"];
    },
  },
};
</script>

<style lang="scss">
#calendar-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
  height: 100%;
  min-height: 100vh;
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
