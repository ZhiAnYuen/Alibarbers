<template>
  <div class="row">
    <div class="col-lg-6 d-flex justify-content-center">
      <div id="card" class="card border border-dark rounded-4">
        <div class="card-body p-5">
          <h1>Create an account</h1>
          <p>I am a...</p>

          <div class="btn-group" role="group">
            <input
              v-model="userType"
              value="Customer"
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio1"
              autocomplete="off"
            />
            <label class="btn btn-outline-dark" for="btnradio1">
              Customer
            </label>
            <input
              v-model="userType"
              value="Hairdresser"
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio2"
              autocomplete="off"
            />
            <label class="btn btn-outline-dark" for="btnradio2">
              Hairdresser
            </label>
          </div>

          <div class="form-floating">
            <input
              v-model="name"
              type="text"
              class="form-control mb-3 mt-3"
              id="floatingNameInput"
              placeholder="name"
            />
            <label for="floatingNameInput">Name</label>
          </div>

          <div class="form-floating">
            <input
              v-model="signUpEmail"
              type="email"
              class="form-control mb-3"
              id="floatingPasswordInput"
              placeholder="name@example.com"
            />
            <label for="floatingPasswordInput">Email address</label>
          </div>

          <div class="form-floating">
            <input
              v-model="signUpPassword"
              type="password"
              class="form-control mb-3"
              id="floatingPassword1"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button
            v-on:click="signUp"
            type="button"
            class="hover-button button mt-4 mb-4 d-block"
          >
            Sign Up
          </button>
          <vue-recaptcha
            sitekey="6LdW9usiAAAAADjdwQP9CRnAsoyl3Aw7o7BvF9R-"
            class="mb-4"
          ></vue-recaptcha>
          <p>
            Already have an account?
            <router-link to="/login"><span>Login</span></router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-lg-6 d-md-none d-lg-block"></div>
  </div>
</template>

<script lang="js">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase.js";
import { useUserStore } from "../stores/users.js";
import { VueRecaptcha } from 'vue-recaptcha';

export default {
  name: "SignUp",
  components: { VueRecaptcha },
  data() {
    return {
      name: "",
      signUpEmail: "",
      signUpPassword: "",
      userType: "",
    };
  },
  methods: {
    signUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.signUpEmail,
        this.signUpPassword
      )
        .then((cred) => {
          setDoc(doc(db.db, "users", cred.user.uid), {
            name: this.name,
            email: this.signUpEmail,
            userType: this.userType,
          });

          const user = useUserStore();
          user.login(this.name, this.signUpEmail, this.userType, cred.user.uid);

          setDoc(doc(db.db, "userChats", cred.user.uid), {});

          alert("Registration was Successful!");
          if (this.userType == "Customer") this.$router.push("/feed");
          if (this.userType == "Hairdresser") this.$router.push("/createshop");
        })
        .catch((error) => {
          console.log(error.code + ": " + error.message);
          alert(error.code + ": " + error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#card {
  z-index: 0;
  width: 600px;
  overflow-x: scroll;
}

span {
  color: black;
  font-weight: bold;
  text-decoration: underline;
}
</style>
