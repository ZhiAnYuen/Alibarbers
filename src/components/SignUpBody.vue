<template>
  <div id="signup-body" class="container-fluid vh-100">
    <div class="row vh-100 align-items-center">
      <div class="col-lg-6 d-flex justify-content-center">
        <div id="card" class="card mx-5 border border-dark rounded-4">
          <div class="card-body p-5">
            <h1>Create an account</h1>
            <p>I am a...</p>

            <div class="btn-group" role="group">
              <label class="btn btn-outline-dark" for="btnradio1">
                <input
                  v-model="user_type"
                  value="Customer"
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                />
                Customer
              </label>
              <label class="btn btn-outline-dark" for="btnradio2">
                <input
                  v-model="user_type"
                  value="Hairdresser"
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                />
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
                v-model="email"
                type="email"
                class="form-control mb-3"
                id="floatingPasswordInput"
                placeholder="name@example.com"
              />
              <label for="floatingPasswordInput">Email address</label>
            </div>

            <div class="form-floating">
              <input
                v-model="password"
                type="password"
                class="form-control mb-3"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>

            <button
              id="hover-button"
              v-on:click="signUp"
              type="button"
              class="button mt-4 mb-4 d-block"
            >
              Sign Up
            </button>
            <p>
              Already have an account?
              <router-link to="/login"><span>Login</span></router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 d-md-none d-lg-block"></div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignUpBody",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      user_type: "",
    };
  },
  methods: {
    signUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          alert("Registration was Successful!");
          this.$router.push("/feed");
        })
        .catch((error) => {
          alert(error.code + ": " + error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#signup-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}

#card {
  z-index: 0;
  width: 600px;
  height: 575px;
}

span {
  color: black;
  font-weight: bold;
  text-decoration: underline;
}
</style>
