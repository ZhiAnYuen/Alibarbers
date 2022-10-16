<template>
  <div id="auth-body" class="container-fluid vh-100">
    <div class="row align-items-center">
      <div class="col">
        <Transition name="slide">
          <div
            id="signup-card"
            class="card border border-dark rounded-4 authcard m-5 position-absolute"
            v-if="mode === 'signup'"
          >
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
                v-on:click="signUp"
                type="button"
                class="hover-button button mt-4 mb-4 d-block"
              >
                Sign Up
              </button>
              <p>
                Already have an account?
                <button @click="mode = 'login'" class="redirect">Login</button>
              </p>
            </div>
          </div>
          <div
            id="login-card"
            class="card m-5 border border-dark rounded-4 authcard position-absolute end-0"
            v-else
          >
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
                v-on:click="login"
                type="button"
                class="hover-button button mt-4 mb-4 d-block"
              >
                Login
              </button>
              <p>
                Don’t have an account?
                <button @click="mode = 'signup'" class="redirect">
                  Register
                </button>
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "AuthBody",
  data() {
    return {
      mode: "login",
      name: "",
      email: "",
      password: "",
      user_type: "",
    };
  },
  methods: {
    login() {
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
#auth-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}

.authcard {
  z-index: 0;
  width: 600px;
  height: 600px;
}

.redirect {
  color: black;
  font-weight: bold;
  text-decoration: underline;
  border: none;
  background-color: transparent;
}

#errMsg {
  color: red;
}

.slide-enter-active,
.slide-leave-active {
  transform: 10s;
}

.slide-enter {
  transform: opacity 1;
}
.slide-leave-to {
  transform: opacity 0;
}
</style>
