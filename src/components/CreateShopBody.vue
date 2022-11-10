<template>
  <h1 class="text-center p-5">Welcome! Set up your shop here.</h1>
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
                v-model="shopname"
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

          <!-- Upload a picture of their shop -->
          <div class="row">
            <label class="my-2" for="shopimg"><strong>Shop Image</strong></label>
            <div class="input-group">
              <input
                type="file"
                class="form-control mb-2"
                id="shopimg"
                accept="image/*"
                v-bind="shopimg"
              />
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
                required
              />
            </div>
            <div class="col-lg-5">
              <input
                type="text"
                :name="'hairdresser[' + index + '][role]'"
                v-model="hairdresser.role"
                class="form-control"
                placeholder="E.g. Men's Haircut Specialist"
                required
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
                required
              />
            </div>
            <div class="col-lg-2">
              <input
                type="number"
                :name="'service[' + index + '][price]'"
                v-model="service.price"
                class="form-control"
                placeholder="Price"
                required
              />
            </div>
            <div class="col-lg-4">
              <input
                type="number"
                :name="'service[' + index + '][duration]'"
                v-model="service.duration"
                class="form-control"
                placeholder="Duration (min)"
                required
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

      <!-- Errors -->
      <div class="alert alert-danger col-12" v-for="error in errors">
        {{ error }}
      </div>

      <!-- Form Validation & Submission -->
      <div class="row my-2 float-end col-auto">
        <button type="reset" class="btn custom-reset col-auto mx-2 hover-button">
          Reset Fields
        </button>
        <button type="submit" class="btn custom col-auto mx-2 hover-button" @click="createShop()">
          Create Shop
        </button>
      </div>
    
    </form>
  </div>
</template>

<script>
import db from "../firebase.js";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { useUserStore } from "../stores/users";
import { computed } from "vue";

export default {
  name: "CreateShop",
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
      shopname: "",
      shoplocation: "",
      services: [{
        name: '',
        price: '',
        duration: ''
      }],
      hairdressers: [{
        name: '',
        role: ''
      }],
      shopnameAvail: 1,
      errors: [],
      shopimg: '',
      opening: '',
      closing: '',
      validateForm: false,
      MRTs: [
        "Punggol",
        "Sembawang",
        "Marine Parade",
        "Serangoon",
        "Woodlands",
        "Tampines",
        "Newton",
        "Buona Vista",
      ],
      selectedMRT: 'Choose...',
    };
  },
  methods: {
    checkAvail() {
      let name = this.shopname.replace(" ", "");
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
    createShop() {
      event.preventDefault();
      var final_hairdressers = [];
      for (var i=0; i < this.hairdressers.length; i++) {
        let temp = {};
        temp['class'] = this.hairdressers[i]['name'].replace(" ", "");
        temp['id'] = i+1;
        temp['role'] = this.hairdressers[i]['role'];
        temp['name'] = this.hairdressers[i]['name'];
        temp['label'] = this.hairdressers[i]['name'].replace(" ", "");
        final_hairdressers.push(temp);
      }

      if (!(this.closing.length==4) || 
          !(this.opening.length==4) ||
          isNaN(this.opening)==true ||
          isNaN(this.closing)==true ) {
        var hourscheck = false;
        alert("Error! Please enter valid opening hours in 24-hour clock format.");
      } else {
        var hourscheck = true;
      }

      if (!(this.shopnameAvail==3) || this.shoplocation=="" || this.errors.length>0 || hourscheck==false || this.selectedMRT=="Choose..." ) {
        console.log(this.selectedMRT, this.shopnameAvail, this.shoplocation, this.opening, this.closing, this.services, final_hairdressers);
        alert("Error! Please fill in all fields.");
      } else {
        let name = this.shopname.replace(" ", "");


        const docRef2 = doc(db.db, "shop", name);
        const data1 = {
          shopName: this.shopname,
          imgLink: this.shopimg,
          location: this.shoplocation,
          ownerEmail: this.email,
          services: this.services,
          open: Number(this.opening.substring(0,2))*60 + (Number(this.opening.substring(2))/60)*60,
          close: Number(this.closing.substring(0,2))*60 + (Number(this.opening.substring(2))/60)*60,
          hairdressers: final_hairdressers,
        };
        setDoc(docRef2, data1)
          .then(() => {
            console.log('Document was added successfully!');
            alert("Success! Welcome, " + this.shopname);
            this.$router.push("/hairdresserfeed");
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  background-color: $pastel-yellow;
}
button.custom {
  background-color: $pastel-yellow;
  color: black;
  border-color: black;
}
button {
  border: 0ch;
}
button.custom-reset {
  background-color: red($color: #000000);
}
</style>