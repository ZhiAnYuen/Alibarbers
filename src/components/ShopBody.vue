<template>
  <div class="container-fluid">
    <div class="row mb-5" id="shopHeader">
      <div
        class="col-md-5 p-5 d-flex justify-content-center align-items-center"
      >
        <img :src="shopDetails['imgLink']" id="shopImg" class="img-fluid" />
      </div>
      <div class="col-md-6 align-self-center ms-5">
        <h1 class="mt-5">{{ shopDetails["shopName"] }}</h1>
        <p class="mt-4 fs-4 fw-light">Rating: {{ shopDetails["rating"] }}</p>
        <p class="mt-4 fs-4 fw-light">
          Operating hours: {{ shopDetails["open"] }} to
          {{ shopDetails["close"] }}
        </p>
        <p class="mt-4 fs-4 fw-light">{{ shopDetails["location"] }}</p>
        <div class="row">
          <button class="hover-button mt-3 mx-3 mb-5 col-6" @click="startConvo">
            Chat
          </button>
          <button class="hover-button mt-3 mx-3 mb-5 col-6">Book</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <ul class="nav justify-content-center col-8" id="bodyNav">
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isOverview }"
            @click="state = 'Overview'"
            >Overview</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isReviews }"
            @click="state = 'Reviews'"
            >Review</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isServices }"
            @click="state = 'Services'"
            >Services</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-bind:class="{ active: isHairdressers }"
            @click="state = 'Hairdressers'"
            >Hairdressers</a
          >
        </li>
      </ul>
      <div v-if="state == 'Overview'" class="m-5 justify-content-center col-8">
        <OverviewBody />
      </div>
      <div
        v-if="state == 'Reviews'"
        class="my-5 justify-content-center col-md-12 col-xl-8"
      >
        <ReviewsBody :shopName="shopDetails['shopName']" />
      </div>
      <div v-if="state == 'Services'" class="m-5 justify-content-center col-8">
        <ServicesBody :services="shopDetails['services']" />
      </div>
      <div
        v-if="state == 'Hairdressers'"
        class="m-5 justify-content-center col-8"
      >
        <p><HairdressersBody :hairdressers="shopDetails['hairdressers']" /></p>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebase.js";
import OverviewBody from "./OverviewBody.vue";
import ServicesBody from "./ServicesBody.vue";
import HairdressersBody from "./HairdressersBody.vue";
import ReviewsBody from "./ReviewsBody.vue";
import { useUserStore } from "../stores/users.js";

export default {
  name: "ShopBody",
  components: {
    OverviewBody,
    ServicesBody,
    ReviewsBody,
    HairdressersBody,
  },
  data() {
    return {
      shopDetails: {},
      state: "Overview",
    };
  },
  mounted() {
    this.getShop();
  },
  methods: {
    getShop() {
      const docRef = doc(db.db, "shop", this.$route.params.id);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          this.shopDetails = docSnap.data();
        } else {
          console.log("No such document!");
        }
      });
    },
    async startConvo() {
      const user = useUserStore();
      let currentUID = user.userID;
      let otherUID = this.$route.params["id"];

      const combinedUID =
        currentUID > otherUID ? currentUID + otherUID : otherUID + currentUID;

      // Get current user conversation with other
      const docSnapUser = await getDoc(doc(db.db, "userChats", currentUID));

      if (docSnapUser.exists() && !docSnapUser.data()[combinedUID]) {
        let nested = {
          displayName: this.shopDetails["shopName"],
          uid: otherUID,
        };

        let toAdd = {};
        toAdd[combinedUID] = nested;

        await updateDoc(doc(db.db, "userChats", currentUID), toAdd);
      }

      const docSnapOther = await getDoc(doc(db.db, "userChats", otherUID));

      if (docSnapOther.exists() && !docSnapOther.data()[combinedUID]) {
        let nested = {
          displayName: user.name,
          uid: currentUID,
        };

        let toAdd = {};
        toAdd[combinedUID] = nested;

        await updateDoc(doc(db.db, "userChats", otherUID), toAdd);
      }

      this.$router.push("/chat/" + currentUID);
    },
  },
  computed: {
    isOverview() {
      return this.state === "Overview" ? "active" : "";
    },
    isReviews() {
      return this.state === "Reviews" ? "active" : "";
    },
    isServices() {
      return this.state === "Services" ? "active" : "";
    },
    isHairdressers() {
      return this.state === "Hairdressers" ? "active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
#shopHeader {
  background-color: $pastel-yellow;
}

#shopImg {
  min-width: 300px;
  max-width: 400px;
}

.hover-button {
  width: 100px;
}

#bodyNav {
  border-bottom: solid 1px black;
  // gap: 100px;
}

.nav-link,
.nav-link:hover {
  color: black;
}
.nav-link:hover,
.nav-link.active {
  border-bottom: 3px solid black;
  margin: -1px;
}
</style>
