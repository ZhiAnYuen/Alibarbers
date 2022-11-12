<template>
  <div class="row align-items-center">
    <div class="col-lg-6 d-md-none d-lg-block"></div>
    <div class="col-lg-6 d-flex justify-content-center">
      <div id="card" class="card m-5 border border-dark rounded-4">
        <div class="card-body p-5">
          <h1>Welcome Back!</h1>
          <p>Sign in to your account below.</p>
          <div v-if="loginStatus" class="alert alert-danger" role="alert">
            {{ loginStatus }}
          </div>
          <div class="form-floating">
            <input
              v-model="loginEmail"
              type="email"
              class="form-control mb-3"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div class="form-floating">
            <input
              v-model="loginPassword"
              type="password"
              class="form-control mb-3"
              id="floatingPassword2"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button
            v-on:click="submit"
            type="button"
            class="hover-button button mt-4 mb-4 d-block"
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
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase.js";
import { useUserStore } from "../stores/users.js";

export default {
  name: "LoginBox",
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      loginStatus: "",
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
        .then(async (cred) => {
          const docRef = doc(db.db, "users", cred.user.uid);
          const docSnap = await getDoc(docRef);
          let name = docSnap.data().name;
          let userType = docSnap.data().userType;

          const user = useUserStore();
          user.login(name, this.loginEmail, userType, cred.user.uid);

          console.log("Login successful");
          if (userType == "Customer") this.$router.push("/feed");
          if (userType == "Hairdresser") this.$router.push("/hairdresserfeed");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              console.log("Invalid email");
              this.loginStatus = "Invalid email. Try again!";
              // alert("Invalid email. Try again!");
              break;
            case "auth/user-not-found":
              console.log("No account with that email was found");
              this.loginStatus = "No account with that email was found. Try again!";
              // alert("No account with that email was found. Try again!");
              break;
            case "auth/wrong-password":
              console.log("Incorrect password");
              this.loginStatus = "Incorrect password. Try again!";
              // alert("Incorrect password. Try again!");
              break;
            default:
              console.log(error);
              console.log("Email or password was incorrect");
              this.loginStatus = "Email or password was incorrect. Try again!";
              // alert("Email or password was incorrect. Try again!");
              break;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#card {
  z-index: 0;
  width: 600px;
}

span {
  color: black;
  font-weight: bold;
  text-decoration: underline;
}
</style>
