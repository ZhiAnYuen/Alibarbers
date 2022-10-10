<template>
  <div id="login-body" class="container-fluid vh-100">
    <div class="row vh-100 align-items-center">
      <div class="col-lg-6 d-md-none d-lg-block"></div>
      <div class="col-lg-6">
        <div id="card" class="card m-5 border border-dark rounded-4">
          <div class="card-body p-5">
            <h1>Welcome Back!</h1>
            <p>Sign in to your account below.</p>
            <div class="input-group mb-3">
              <input
                id="username"
                type="text"
                v-model="username"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                autocomplete="off"
              />
            </div>
            <div class="input-group mb-3">
              <input
                id="password"
                type="text"
                v-model="password"
                class="form-control"
                placeholder="Password"
                aria-label="Password"
                autocomplete="off"
              />
            </div>
            <p>Forgot Password?</p>
            <button
              id="hover-button"
              v-on:click="submit"
              type="button"
              class="button mt-4 mb-4 d-block"
            >
              Login
            </button>
            <p>Don’t have an account? <span>Register</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginBody",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then(() => {
          console.log("Login successful");
          this.$router.push("/feed");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              console.log("Invalid email");
              break;
            case "auth/user-not-found":
              console.log("No account with that email was found");
              break;
            case "auth/wrong-password":
              console.log("Incorrect password");
              break;
            default:
              console.log("Email or password was incorrect");
              break;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#login-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}

#card {
  z-index: 0;
  max-width: 600px;
}

span {
  font-weight: bold;
  text-decoration: underline;
}
</style>
