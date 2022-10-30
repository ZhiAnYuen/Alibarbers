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
import { doc, setDoc, getDoc } from "firebase/firestore";
import { EmailAuthCredential, getAuth } from "firebase/auth";
import { useUserStore } from "../stores/users";

// const auth = getAuth();
// const user = auth.currentUser;
// console.log(user);

export default {
  name: "CreateShop",
  created() {
    this.addService();
  },
  data() {
    return {
      shopname: "",
      shoplocation: "",
      services: [],
      shopnameAvail: 1,
      errors: [],
      shopimg: "",
      owneremail: useUserStore.email,
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
    createShop() {
      setDoc(doc(db.db, "shop", this.shopname), {
        shopName: this.shopname,
        imgLink: this.shopimg,
        location: this.shoplocation,
        ownerEmail: this.owneremail,
        services: this.services,
      });
      console.log("Document written with ID: " + docRef.id);
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