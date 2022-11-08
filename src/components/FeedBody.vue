<template>
  <div class="container-fluid">
    <p class="text-start ms-5 mt-5 fw-semibold">Hello {{ name }},</p>
    <h1 class="text-start ms-5 fw-semibold">Get a makeover today!</h1>
    <div class="row mt-5 justify-content-center">
      <!-- <p class="text-center border">filter row (WIP)</p> -->
      <div class="row col-10 justify-content-center">
        <div class="col-4">
          <multiselect
            v-model="services"
            :options="servicesOptions"
            placeholder="Filter services"
            :show-labels="false"
            :multiple="true"
          />
        </div>
        <div class="col-4">
          <multiselect
            v-model="categories"
            :options="categoriesOptions"
            placeholder="Filter category"
            :show-labels="false"
            :multiple="true"
          />
        </div>
        <div class="col-4">
          <multiselect
            v-model="locations"
            :options="locationsOptions"
            placeholder="Filter location"
            :show-labels="false"
            :multiple="true"
          />
        </div>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <transition-group appear name="list">
        <div v-if="isLoading" class="col-2 text-center">
          <h1>Loading...</h1>
        </div>
        <div
          v-else
          v-for="feed in filtered"
          :key="feed.id"
          class="col-sm-6 col-md-4 col-lg-2 my-2"
        >
          <FeedCard
            :imgLink="feed.imgLink"
            :name="feed.shopName"
            :rating="feed.rating"
            :id="feed.id"
          />
        </div>
      </transition-group>
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
  setup() {
    const user = useUserStore();

    return {
      name: computed(() => user.name),
      email: computed(() => user.email),
      isLoggedIn: computed(() => user.isLoggedIn),
      userType: computed(() => user.userType),
    };
  },
  data() {
    return {
      feeds: [],
      isLoading: true,
      services: null,
      servicesOptions: ["Hair-cutting", "Colouring", "Styling"],
      categories: null,
      categoriesOptions: ["Most Popular", "Male Hairstyle", "Female Hairstyle"],
      locations: null,
      locationsOptions: [
        "Punggol",
        "Sembawang",
        "Marine Parade",
        "Serangoon",
        "Woodlands",
        "Tampines",
        "Newton",
        "Buona Vista",
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
    getAllShops() {
      getDocs(collection(db.db, "shop")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj["id"] = doc.id;
          this.feeds.push(obj);
        });
      });
      this.isLoading = false;
    },
    test() {
      console.log(this.locations);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scope>
.multiselect__tag {
  background: $pastel-yellow;
  color: black;
}

.multiselect__option--highlight {
  color: black;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background-color: $pastel-yellow;
}

.list-enter-active,
.list-move {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}
</style>
