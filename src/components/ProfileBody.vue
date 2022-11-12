<template>
  <h1 class="text-center p-5">Your Shop</h1>
  <div class="container" width="90%">
    <form>
      <div class="row my-4">
        <div class="col-lg-4 mb-2">
          <h4>Basic Information</h4>
          <small class="text-muted">Provide some information about your shop.</small>
        </div>
        <div class="col-lg-8">
          <!-- Shop name input and verification -->
          <div class="row">
            <div class="">
              <label for="shopname" class="form-label"><strong>Shop Name</strong></label>
            </div>
            <div class="">
              <input
                type="text"
                class="form-control"
                id="shopname"
                v-model="newshopname"
                placeholder="E.g. Sally's Hairdressers"
              />
              <button
                v-if="shopnameAvail == 1"
                type="button"
                class="btn custom my-2"
                @click="checkAvail()"
              >
                Verify Shop Name
              </button>
              <span v-if="shopnameAvail == 2" class="form-text">
                <button type="button" class="btn custom my-2" @click="checkAvail()">
                  Verify Shop Name
                </button>
              </span>
              <div v-if="shopnameAvail == 3" class="form-text my-2">
                Shop Name Verified!
              </div>
            </div>
          </div>
        
          <!-- Opening hours -->
          <div class="row my-2">
            <div class="">
              <label for="hours" class="form-label"><strong>Opening Hours</strong> (24-hour clock)</label>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <input
                  type="text"
                  class="form-control"
                  id="hours"
                  v-model="opening"
                  placeholder="E.g. 0800"
                />
              </div>
              <div class="col-lg-6">
                <input
                  type="text"
                  class="form-control"
                  id="hours"
                  v-model="closing"
                  placeholder="E.g. 1800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr/>

      <!-- Shop Location -->
      <div class="row my-4">
        <div class="col-lg-4 mb-2">
          <h4>Shop Location</h4>
          <small class="text-muted">Provide some information where your shop is located.</small>
        </div>
        <div class="col-lg-8">
          <div class="row">
            <div class="">
              <label for="shoplocation" class="form-label"><strong>Shop Location</strong></label>
            </div>
            <div class="">
              <input
                type="text"
                class="form-control mb-2"
                id="shoplocation"
                v-model="shoplocation"
                placeholder="E.g. 6 Thompson Rd, Singapore 366481"
              />
            </div>
          </div>
          <div class="row">
            <div class="">
              <label class="form-label my-2"><strong>Nearest MRT Station</strong></label>
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Options</label>
              <select class="form-select" id="inputGroupSelect01" v-model="selectedMRT">
                <option selected>Choose...</option>
                <option v-for="mrt of MRTs" >{{mrt}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <hr/>
      
      <!-- Add & remove available hairdressers -->
      <div class="row my-4">
        <div class="col-lg-4 mb-2">
          <h4>Add One or More Hairdressers</h4>
          <small class="text-muted">Provide some information about you and/or your staff.</small>
        </div>
        <div class="col-lg-8 mb-2">
          <div class="form-group row mb-2" v-for="(hairdresser, index) in hairdressers" :key="index">
            <div class="col-lg-5">
              <input
                type="text"
                :name="'hairdresser[' + index + '][name]'"
                v-model="hairdresser.name"
                class="form-control"
                placeholder="E.g. Tom Chan"
              />
            </div>
            <div class="col-lg-5">
              <input
                type="text"
                :name="'hairdresser[' + index + '][role]'"
                v-model="hairdresser.role"
                class="form-control"
                placeholder="E.g. Men's Haircut Specialist"
              />
            </div>
            <div class="col-lg-2">
              <button
                type="button"
                @click="removeHairdresser(index)"
                class="btn btn-outline-danger"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="">
              <button type="button" @click="addHairdresser()" class="btn custom">
                Add Hairdresser
              </button>
          </div>
        </div>
      </div>

      <hr/>

      <!-- Add & remove available services -->
      <div class="row my-4">
        <div class="col-lg-4 mb-2">
          <h4>Add One or More Services</h4>
          <small class="text-muted">Provide some information about the hairdressing services your shop offers.</small>
        </div>
        <div class="col-lg-8">
          <div class="form-group row mb-2" v-for="(service, index) in services" :key="index">
            <div class="col-lg-4">
              <input
                type="text"
                :name="'service[' + index + '][name]'"
                v-model="service.name"
                class="form-control"
                placeholder="E.g. Hair Cut"
              />
            </div>
            <div class="col-lg-2">
              <input
                type="number"
                :name="'service[' + index + '][price]'"
                v-model="service.price"
                class="form-control"
                placeholder="Price"
              />
            </div>
            <div class="col-lg-4">
              <input
                type="number"
                :name="'service[' + index + '][duration]'"
                v-model="service.duration"
                class="form-control"
                placeholder="Duration (min)"
              />
            </div>
            <div class="col-lg-1">
              <button
                type="button"
                @click="removeService(index)"
                class="btn btn-outline-danger"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="">
            <button type="button" @click="addService()" class="btn custom">
              Add Service
            </button>
          </div>
        </div>
      </div>

      <hr/>

      <!-- Check & uncheck shop tags -->
      <div class="row my-4">
        <div class="col-lg-4 mb-2">
          <h4>Add Tags</h4>
          <small class="text-muted">Choose the tags that describe your shop and services. This is optional but could help customers pick your shop based on their needs!</small>
        </div>
        <div class="col-lg-8">
          <div class="row justify-content-around text-center">
            <div class="col-sm-6 col-md-4" v-for="tag of tags" :key="tag">
              <input 
                type="checkbox" 
                class="btn-check" 
                :id="tag" 
                autocomplete="off"
                :value="tag"
                v-model="selectedTags"
              >
              <label class="btn customlabel rounded-5 m-1" :for="tag">{{tag}}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Errors -->
      <div class="alert alert-danger col-12" v-for="error in errors">
        {{ error }}
      </div>

      <!-- Form Validation & Submission -->
      <div class="row my-2 float-end col-auto">
        <button type="submit" class="btn custom-submit col-auto mx-2 hover-button" @click="createShop()">
          Edit Profile
        </button>
      </div>
    
    </form>
      
  </div>
</template>

<script>
import db from "../firebase.js";
import { query, where, getDocs, collection, getDoc } from "firebase/firestore";
import { useUserStore } from "../stores/users";
import { computed } from "vue";

export default {
  name: 'ProfileBody',
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
      tags: [
        'Male Hairstyles', 
        'Female Hairstyles',
        'Perming',
        'Colouring',
        'Hair Cuts',
        'Scalp Treatment',
        'Wedding Hairstyles',
        'Wellness',
        'Bleaching',
      ],
      MRTs: [
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
        "Marine Parade"
      ],
      shopdata: undefined,
      hairdressers: [],
      services: [],
      shoplocation: '',
      shopname: '',
      newshopname: '',
      shopimg: '../assets/shop1.img',
      opening: '',
      closing: '',
      selectedTags: [],
      selectedMRT: '',
      errors: [],
      shopnameAvail: 1,
    }
  },
  async mounted() {
    let shopsRef = collection(db.db, "shop");
    let q = query(shopsRef, where("ownerEmail", "==", this.email));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.shopdata = doc.data();
    });
    // assign values to Vue app data for v-model ing
    if (!(this.shopdata==undefined)) {
      this.shopname = this.shopdata.shopName;
      this.newshopname = this.shopdata.shopName;
      this.closing = this.shopdata.rawClosing;
      this.opening = this.shopdata.rawOpening;
      this.hairdressers = this.shopdata.hairdressers;
      this.services = this.shopdata.services;
      this.shoplocation = this.shopdata.location;
      this.selectedMRT = this.shopdata.selectedMRT;
      this.selectedTags = this.shopdata.selectedTags;
    }
  },
  methods: {
    checkAvail() {
      if (this.shopname == this.newshopname) {
        this.shopnameAvail = 3; // Shop name will be verified
      } else {
        let name = this.newshopname.replace(" ", "");
        var docRef = doc(db.db, "shop", name);
        getDoc(docRef).then((docSnap) => {
          if (!docSnap.exists()) {
            console.log("No matching document.");
            this.shopnameAvail = 3; // Shop name will be verified
            if (
              this.errors.indexOf(
                "The selected shop name has been taken. Please select another name for your shop."
              ) != -1
            ) {
              let i = this.errors.indexOf(
                "The selected shop name has been taken. Please select another name for your shop."
              );
              this.errors.splice(i, 1);
            }
          } else {
            console.log("Document data:", docSnap.data);
            this.shopnameAvail = 2; // Error - shop name has been taken
            if (
              this.errors.indexOf(
                "The selected shop name has been taken. Please select another name for your shop."
              ) == -1
            ) {
              this.errors.push(
                "The selected shop name has been taken. Please select another name for your shop."
              );
            }
          }
        });
      }
    },
    addService() {
      this.services.push({
        name: "",
        price: "",
        duration: "",
      });
      if (
        this.errors.indexOf(
          "Your shop has to provide at least 1 hairdressing service!"
        ) != -1
      ) {
        let i = this.errors.indexOf(
          "Your shop has to provide at least 1 hairdressing service!"
        );
        this.errors.splice(i, 1);
      }
    },
    removeService(index) {
      if (this.services.length <= 1) {
        this.errors.push(
          "Your shop has to provide at least 1 hairdressing service!"
        );
      }
      this.services.splice(index, 1);
    },
    addHairdresser() {
      this.hairdressers.push({
        name: "",
        role: "",
      });
      if (
        this.errors.indexOf(
          "Your shop has to have at least 1 hairdresser!"
        ) != -1
      ) {
        let i = this.errors.indexOf(
          "Your shop has to have at least 1 hairdresser!"
        );
        this.errors.splice(i, 1);
      }
    },
    removeHairdresser(index) {
      if (this.hairdressers.length <= 1) {
        this.errors.push(
          "Your shop has to have at least 1 hairdresser!"
        );
      }
      this.hairdressers.splice(index, 1);
    },
    editShop() {

    },
  },
};
</script>

<style lang="scss" scoped>
  h1 {
    background-color: $pastel-yellow;
  }
  img.custom {
    height: 130px;
    width: 150px;
    object-fit: cover;
  }
  button.custom {
    color: black;
    border-color: black;
  }
  button.custom:hover {
    background-color: $pastel-yellow;
  }
  button.custom-submit:hover {
    background-color: $pastel-yellow;
  }
  label.customlabel:hover {
    background-color: $pastel-yellow;
  }
  label.customlabel:checked {
    background-color: $pastel-yellow;
    border: 1px;
  }
</style>