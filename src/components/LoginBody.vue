<template>
  <div id="login-body" class="container-fluid vh-100">
    <div class="row vh-100 align-items-center">
      <div class="col-lg-6 d-md-none d-lg-block"></div>
      <div class="col-lg-6 d-flex justify-content-center">
        <div id="card" class="card m-5 border border-dark rounded-4">
          <div class="card-body p-5">
            <h1>Welcome Back!</h1>
            <p>Sign in to your account below.</p>
            <div class="form-floating">
              <input
                v-model="email"
                type="email"
                class="form-control mb-3"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
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
              v-on:click="submit"
              type="button"
              class="button mt-4 mb-4 d-block"
            >
              Login
            </button>
            <p>
              Don’t have an account?
              <router-link to="/signup"><span>Register</span></router-link>
            </p>
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
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          console.log("Login successful");
          this.$router.push("/feed");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              console.log("Invalid email");
              alert("Invalid email. Try again!");
              break;
            case "auth/user-not-found":
              console.log("No account with that email was found");
              alert("No account with that email was found. Try again!");
              break;
            case "auth/wrong-password":
              console.log("Incorrect password");
              alert("Incorrect password. Try again!");
              break;
            default:
              console.log("Email or password was incorrect");
              alert("Email or password was incorrect. Try again!");
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
  width: 600px;
}

span {
  color: black;
  font-weight: bold;
  text-decoration: underline;
}

#errMsg {
  color: red;
}
</style>
