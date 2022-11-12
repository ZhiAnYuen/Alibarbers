<template>
  <div class="container-fluid mt-4 mx-5">
    <span class="text-start fw-semibold">Hello {{ name }},</span>
    <h1 class="text-start fw-semibold">Get a makeover today!</h1>
    <div class="row">
      <div
        class="col-lg-3 col-md-4 col-sm-12 card border border-dark rounded-4 mt-3 gy-2 p-4 h-100"
      >
        <div class="d-flex flex-row align-items-center">
          <span class="text-start fw-semibold">Filters</span>
          <button
            type="button"
            class="hover-button button ms-auto"
            @click="
              this.categories = null;
              this.services = null;
              this.locations = null;
            "
          >
            Reset
          </button>
        </div>
        <hr />
        <span class="text-start fw-semibold">Services</span>
        <multiselect
          v-model="services"
          :options="servicesOptions"
          placeholder="Filter services"
          :show-labels="false"
          :multiple="true"
        />
        <span class="text-start fw-semibold mt-4">Categories</span>
        <multiselect
          v-model="categories"
          :options="categoriesOptions"
          placeholder="Filter category"
          :show-labels="false"
          :multiple="true"
        />
        <span class="text-start fw-semibold mt-4">Locations</span>
        <multiselect
          v-model="locations"
          :options="locationsOptions"
          placeholder="Filter MRT location"
          :show-labels="false"
          :multiple="true"
        />
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12 ps-4">
        <div class="row mt-4" v-auto-animate>
          <div
            v-for="feed in filtered"
            :key="feed.id"
            class="col-sm-6 col-md-4 col-lg-3"
          >
            <FeedCard
              :imgLink="feed.imgLink"
              :name="feed.shopName"
              :rating="feed.rating"
              :id="feed.id"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <button @click="test">test</button> -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "../stores/users.js";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase.js";
import FeedCard from "./FeedCard.vue";
import Multiselect from "vue-multiselect";

export default {
  name: "FeedBody",
  components: {
    FeedCard,
    Multiselect,
  },
  data() {
    const user = useUserStore();

    return {
      name: computed(() => user.name),
      email: computed(() => user.email),
      isLoggedIn: computed(() => user.isLoggedIn),
      userType: computed(() => user.userType),
      feeds: [],
      services: null,
      servicesOptions: [
        "Hair-cutting",
        "Colouring",
        "Styling",
        "Perming",
        "Colouring",
        "Hair Cuts",
        "Scalp Treatment",
        "Wedding Hairstyles",
        "Wellness",
        "Bleaching",
      ],
      categories: null,
      categoriesOptions: ["Most Popular", "Male Hairstyle", "Female Hairstyle"],
      locations: null,
      locationsOptions: [
        "Sembawang",
        "Marine Parade",
        "Joo Koon",
        "Jurong East",
        "Bukit Panjang",
        "Woodlands",
        "Botanic Gardens",
        "Buona Vista",
        "Outram Park",
        "Somerset",
        "Newton",
        "Bishan",
        "Serangoon",
        "City Hall",
        "Bugis",
        "Paya Lebar",
        "Farrer Park",
        "Hougang",
        "Punggol",
        "Bedok",
        "Tampines",
        "Marine Parade",
      ],
    };
  },
  computed: {
    filtered() {
      function checker(arr, target) {
        if (target == null) {
          return true;
        }
        return target.every((v) => arr.includes(v));
      }

      let filtered_result = [];
      for (let feed of this.feeds) {
        let tags = feed.tags;

        if (
          checker(tags, this.services) &&
          checker(tags, this.categories) &&
          checker(tags, this.locations)
        ) {
          filtered_result.push(feed);
        }
      }
      return filtered_result;
    },
  },
  mounted() {
    this.getAllShops();
  },
  methods: {
    async getAllShops() {
      getDocs(collection(db.db, "shop")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj["id"] = doc.id;
          this.feeds.push(obj);
        });
      });
    },
    test() {
      console.log(this.locations);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scoped>
.feedcard {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  margin-bottom: 30px;
  cursor: pointer;
}

.feedcard:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
</style>
