<template>
  <h1 class="text-center p-5">Welcome! Set up your shop here.</h1>
  <div class="container">
    <div class="alert alert-danger col-12" v-for="error in errors">
      {{ error }}
    </div>

    <form>
      <!-- Shop name input and verification -->
      <div class="row">
        <label for="shopname" class="form-label my-3">Shop Name</label>
      </div>
      <div class="row mb-2">
        <div class="col-lg-3">
          <input
            type="text"
            class="form-control"
            id="shopname"
            v-model="shopname"
            placeholder="E.g. Sally's Hairdressers"
          />
        </div>
        <div class="col-lg-9">
          <span>
            <button
              v-if="shopnameAvail == 1"
              type="button"
              class="btn custom"
              @click="checkAvail()"
            >
              Verify Shop Name
            </button>
            <span v-if="shopnameAvail == 2" class="form-text">
              <button type="button" class="btn custom" @click="checkAvail()">
                Verify Shop Name
              </button>
            </span>
            <div v-if="shopnameAvail == 3" class="form-text">
              Shop Name Verified!
            </div>
          </span>
        </div>
      </div>

      <!-- Upload a picture of their shop -->
      <div class="row">
        <label class="my-3" for="shopimg">Shop Image</label>
      </div>
      <div class="row mb-2">
        <div class="input-group col-lg-6">
          <input
            type="file"
            class="form-control"
            id="shopimg"
            accept="image/*"
            v-bind="shopimg"
          />
          <label class="input-group-text" for="shopimg">Upload</label>
        </div>
      </div>

      <!-- Shop location. Need to add API here? -->
      <div class="row">
        <label for="shoplocation" class="my-3 form-label">Shop Location</label>
      </div>
      <div class="row mb-2">
        <div class="col-lg-6">
          <input
            type="text"
            class="form-control"
            id="shoplocation"
            v-model="shoplocation"
            placeholder="E.g. 6 Thompson Rd, Singapore 366481"
          />
        </div>
      </div>

      <!-- Opening hours -->
      <div class="row">
        <label for="hours" class="my-3 form-label">Opening Hours</label>
      </div>
      <div class="row mb-8">
        <div class="col-lg-3">
          <input
            type="text"
            class="form-control"
            id="hours"
            v-model="opening"
            placeholder="E.g. 0800"
          />
        </div>
        <div class="col-lg-3">
          <input
            type="text"
            class="form-control"
            id="hours"
            v-model="closing"
            placeholder="E.g. 1800"
          />
        </div>
      </div>

      <!-- Add & remove available hairdressers -->
      <div class="row">
        <div class="my-3 col-lg-12">Add One or More Hairdressers</div>
      </div>
      <div class="form-group row mb-2" v-for="(hairdresser, index) in hairdressers">
        <div class="col-md-3">
          <input
            type="text"
            :name="'hairdresser[' + index + '][name]'"
            class="form-control"
            placeholder="E.g. Tom Chan"
          />
        </div>
        <div class="col-md-3">
          <input
            type="text"
            :name="'hairdresser[' + index + '][role]'"
            class="form-control"
            placeholder="E.g. Men's Haircut Specialist"
          />
        </div>
        <div class="col-md-3">
          <button
            type="button"
            @click="removeHairdresser(index)"
            class="btn btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <button type="button" @click="addHairdresser()" class="btn custom">
            Add Hairdresser
          </button>
        </div>
      </div>

      <!-- Add & remove available services -->
      <div class="row">
        <div class="my-3 col-lg-12">Add One or More Services</div>
      </div>
      <div class="form-group row mb-2" v-for="(service, index) in services">
        <div class="col-md-3">
          <input
            type="text"
            :name="'service[' + index + '][name]'"
            class="form-control"
            placeholder="E.g. Hair Cut"
          />
        </div>
        <div class="col-md-3">
          <input
            type="number"
            :name="'service[' + index + '][price]'"
            class="form-control"
            placeholder="Price"
          />
        </div>
        <div class="col-md-3">
          <input
            type="number"
            :name="'service[' + index + '][duration]'"
            class="form-control"
            placeholder="Duration (min)"
          />
        </div>
        <div class="col-md-3">
          <button
            type="button"
            @click="removeService(index)"
            class="btn btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <button type="button" @click="addService()" class="btn custom">
            Add Service
          </button>
        </div>
      </div>

      <!-- Form submission -->
      <div class="row my-2 float-end">
        <button type="reset" class="btn btn-danger col-auto">
          Reset Fields
        </button>
        <button
          type="submit"
          class="btn btn-primary col-auto"
          @click="createShop()"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase.js";
import { doc, addDoc, getDoc } from "firebase/firestore";
import { EmailAuthCredential, getAuth } from "firebase/auth";
import { useUserStore } from "../stores/users";

// const auth = getAuth();
// const user = auth.currentUser;
// console.log(user);

export default {
  name: "CreateShop",
  created() {
    this.addService();
    this.addHairdresser();
  },
  data() {
    return {
      shopname: "",
      shoplocation: "",
      services: [],
      hairdressers: [],
      shopnameAvail: 1,
      errors: [],
      shopimg: "",
      owneremail: useUserStore.email,
      opening: "",
      closing: "",
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
        duration: 0,
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
    async createShop() {
      let final_hairdressers = [];
      for (i=0; i < hairdressers.length; i++) {
        temp = {};
        temp['class'] = hairdressers[i]['name'].replace(" ", "");
        temp['id'] = i+1;
        temp['role'] = hairdressers[i]['role'];
        temp['name'] = hairdressers[i]['name'];
        temp['label'] = hairdressers[i]['name'].replace(" ", "");
        final_hairdressers.push(temp);
      }
      console.log(final_hairdressers);
      
      let docRef2 = await addDoc(collection(db.db, "shop"), {
        shopName: this.shopname,
        imgLink: this.shopimg,
        location: this.shoplocation,
        ownerEmail: this.owneremail,
        services: this.services,
        open: this.opening,
        close: this.closing,
        hairdressers: final_hairdressers,
      });
      console.log("Document written with ID: " + docRef2.id);
      alert("Success! Welcome, " + this.shopname);
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
}
button {
  border: 0ch;
}
</style>