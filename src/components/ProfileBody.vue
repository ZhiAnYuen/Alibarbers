<template>
  <h1 class="text-center p-5">Your Shop</h1>
  
  <div class="container px-lg-5 px-md-4 px-sm-4 px-4" width="90%">
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
                @change="changeAvail()"
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
          <!-- Errors -->
          <div class="alert alert-danger col-12" v-for="error in shopnameerror">
            {{ error }}
          </div>

          <!-- Shop Description -->
          <div class="row">
            <label class="my-2" for="shopdesc"><strong>Shop Description</strong></label>
            <div class="">
              <textarea class="form-control" id="shopdesc" rows="3" v-model="shopdesc"></textarea>
            </div>
          </div>
        
          <!-- Opening Hours -->
          <div class="row my-2">
            <div class="">
              <label for="hours" class="form-label"><strong>Opening Hours</strong> (24-hour clock)</label>
            </div>
            <div class="">
              <div class="row">
                <div class="col-sm-6 mb-2 mb-xs-0">
                  <input
                    type="text"
                    class="form-control"
                    id="hours"
                    v-model="opening"
                    placeholder="E.g. 0800"
                  />
                </div>
                <div class="col-sm-6">
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

          <!-- Contact Information -->
          <div class="row">
            <label class="my-2" for="contact"><strong>Contact Information</strong></label>
            <div class="">
              <div class="row">
                <div class="col-sm-6 mb-2 mb-xs-0">
                  <input 
                    type="tel" 
                    class="form-control"
                    id="contact"
                    v-model="phoneno"
                    placeholder="Phone/Office Number"
                  />
                </div>
                <div class="col-sm-6 mb-2 mb-xs-0">
                  <input 
                    type="email" 
                    class="form-control"
                    id="contact"
                    v-model="contactemail"
                    placeholder="Email"
                  />
                </div>
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
            <div class="col-md-5 mb-2 mb-md-0">
              <input
                type="text"
                :name="'hairdresser[' + index + '][name]'"
                v-model="hairdresser.name"
                class="form-control"
                placeholder="E.g. Tom Chan"
              />
            </div>
            <div class="col-md-5 mb-2 mb-md-0">
              <input
                type="text"
                :name="'hairdresser[' + index + '][role]'"
                v-model="hairdresser.role"
                class="form-control"
                placeholder="E.g. Men's Haircut Specialist"
              />
            </div>
            <div class="col-md-2">
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
            <div class="col-md-4 mb-2 mb-md-0">
              <input
                type="text"
                :name="'service[' + index + '][name]'"
                v-model="service.name"
                class="form-control"
                placeholder="E.g. Hair Cut"
              />
            </div>
            <div class="col-md-2 mb-2 mb-md-0">
              <input
                type="number"
                :name="'service[' + index + '][price]'"
                v-model="service.price"
                class="form-control"
                placeholder="Price"
              />
            </div>
            <div class="col-md-4 mb-2 mb-md-0">
              <input
                type="number"
                :name="'service[' + index + '][duration]'"
                v-model="service.duration"
                class="form-control"
                placeholder="Duration (min)"
              />
            </div>
            <div class="col-md-1">
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
      <div class="row mt-4 mb-3">
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
      <div class="row pb-3 float-end col-auto">
        <button type="button" class="btn custom-reset col-auto mx-2 hover-button" @click="cancelEdit()">
          Reset Fields
        </button>
        <button type="submit" class="btn custom col-auto mx-2 hover-button" @click="updateProfile()">
          Edit Profile
        </button>
      </div>
    
    </form>
      
  </div>
</template>

<script>
import db from "../firebase.js";
import { query, where, getDocs, collection, doc, setDoc } from "firebase/firestore";
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
      userID: computed(() => user.userID),
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
      shopnameAvail: 3,
      shopnameerror: [],
      shopdesc: '',
      contactemail: '',
      phoneno: '',
    }
  },
  async mounted() {
    // get shop details based on user's email
    let shopsRef = collection(db.db, "shop");
    let q = query(shopsRef, where("ownerEmail", "==", this.email));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
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
      this.shopdesc = this.shopdata.shopDescription;
      this.contactemail = this.shopdata.contactEmail;
      this.phoneno = this.shopdata.phoneNum;
    } else {
      alert("You have not set up your shop yet!");
      this.$router.push("/createshop");
    }
  },
  methods: {
    changeAvail() {
      this.shopnameAvail = 1;
    },
    checkAvail() {
      let othershopdata = undefined;
      if (this.shopname == this.newshopname) {
        this.shopnameAvail = 3; // Shop name will be verified
        if (
          this.shopnameerror.indexOf(
            "This shop name has been taken. Please select another name for your shop."
          ) != -1
        ) {
          let i = this.shopnameerror.indexOf(
            "This shop name has been taken. Please select another name for your shop."
          );
          this.shopnameerror.splice(i, 1);
        }
      } else {
        let q = query(collection(db.db, "shop"), where("shopName", "==", this.newshopname));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              othershopdata = doc.data();
            })
            //console.log(othershopdata);
            if (othershopdata == undefined) {
              //console.log("No matching document.");
              this.shopnameAvail = 3; // Shop name will be verified
              if (
                this.shopnameerror.indexOf(
                  "This shop name has been taken. Please select another name for your shop."
                ) != -1
              ) {
                let i = this.shopnameerror.indexOf(
                  "This shop name has been taken. Please select another name for your shop."
                );
                this.shopnameerror.splice(i, 1);
              }
            } else {
              //console.log('ERROR SHOULD SHOW!')
              this.shopnameAvail = 2; // Error - shop name has been taken
              if (
                this.shopnameerror.indexOf(
                  "This shop name has been taken. Please select another name for your shop."
                ) == -1
              ) {
                this.shopnameerror.push(
                  "This shop name has been taken. Please select another name for your shop."
                );
              }
            }
          })
          .catch(error => {
            //console.log(error);
            alert("Please enter a valid shop name.")
          })
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
    updateProfile() {
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
        alert("Error! Please fill in all fields.");
      } else {
        // getting tags
        let final_tags = [];
        for (let tag of this.selectedTags) {
          final_tags.push(tag);
        }
        final_tags.push(this.selectedMRT);

        const docRef2 = doc(db.db, "shop", this.userID);
        const data1 = {
          shopName: this.newshopname,
          location: this.shoplocation,
          services: this.services,
          open: Number(this.opening.substring(0,2))*60 + (Number(this.opening.substring(2))/60)*60,
          close: Number(this.closing.substring(0,2))*60 + (Number(this.opening.substring(2))/60)*60,
          hairdressers: final_hairdressers,
          tags: final_tags,
          selectedMRT: this.selectedMRT,
          rawClosing: this.closing,
          rawOpening: this.opening,
          selectedTags: this.selectedTags,
          shopDescription: this.shopdesc,
          phoneNum: this.phoneno,
          contactEmail: this.contactemail,
        };
        setDoc(docRef2, data1, {merge: true})
          .then(() => {
            //console.log('Document was added successfully!');
            alert("You have successfully edited your shop profile.");
            location.reload();
          })
          .catch(error => {
            //console.log(error);
            alert("Edit failed. Please try again.")
          })
        }

    },
    cancelEdit() {
      location.reload();
    }
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
    background-color: $pastel-yellow;
    color: black;
  }
  button.custom:hover {
    border-color: black;
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