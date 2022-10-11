<template>
  <nav class="navbar navbar-expand-lg bg-light border-bottom">
    <div class="container-fluid">
      <router-link to="/feed" class="navbar-brand ms-5 h1"
        >Alibarbers</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse p-3" id="navbarText">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
          <li class="nav-item">
            <router-link to="#" class="nav-link">Explore</router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link">My Appointments</router-link>
          </li>
          <li class="nav-item">
            <p v-on:click="signOut" class="nav-link">Logout</p>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "FeedHeader",
  methods: {
    signOut() {
      signOut(getAuth()).then(() => {
        this.$router.push("/home");
      });
    },
  },
};
</script>
