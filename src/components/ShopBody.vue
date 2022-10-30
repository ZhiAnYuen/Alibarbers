<template>
  <div class="container-fluid">
    <div class="row mx-5 mt-5">
      <div class="col-md-6 mb-3">
        <h1 class="mt-5">{{ shopDetails["shopName"] }}</h1>
        <p class="mt-4 fs-4 fw-normal">Rating: {{ shopDetails["rating"] }}</p>
        <p class="mt-4 fs-3 fw-normal">{{ shopDetails["location"] }}</p>
        <p class="mt-4 fs-5 fw-light">
          Operating hours: {{ shopDetails["open"] }} to
          {{ shopDetails["close"] }}
        </p>
      </div>
      <div class="col-md-6 d-flex justify-content-end align-items-center">
        <img :src="shopDetails['imgLink']" id="shopImg" class="img-fluid" />
      </div>
    </div>
    <div class="row mx-5 mt-5">
      <div class="col-md-6">
        <h3 class="text-center mb-4">Services Provided</h3>
        <div v-for="(service, index) in shopDetails['services']" :key="index">
          <div class="row">
            <div class="col-md-6 text-center">
              <p class="fs-5 fw-light">{{ service["name"] }}</p>
            </div>
            <div class="col-md-6 text-center">
              <p class="fs-5 fw-light">
                ${{ service["price"] }}, {{ service["duration"] }} mins
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h3 class="text-center mb-4">Hairdressers</h3>
        <div
          v-for="(hairdresser, index) in shopDetails['hairdressers']"
          :key="index"
        >
          <div class="row text-center">
            <p class="fs-5 fw-light">
              {{ hairdresser["name"] }} - {{ hairdresser["role"] }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="position-fixed bottom-0 end-0 m-5">
      <button class="hover-button">Book</button>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase.js";

export default {
  name: "ShopBody",
  data() {
    return {
      shopDetails: {},
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
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      });
    },
    test() {
      console.log(this.shopDetails["imgLink"]);
    },
  },
};
</script>

<style lang="scss" scoped>
#shopImg {
  min-width: 300px;
  max-width: 400px;
}
</style>
