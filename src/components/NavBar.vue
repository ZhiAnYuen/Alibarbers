<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link to="/home" class="navbar-brand ms-5 h1">
        AliBarbers
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse p-3" id="navbarNav">
        <ul
          v-if="!isLoggedIn($route.name)"
          class="navbar-nav ms-auto mb-2 mb-lg-0 me-5"
        >
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <span class="fw-semibold text-dark"> Login </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">
              <span class="fw-semibold text-dark"> Sign Up </span>
            </router-link>
          </li>
        </ul>

        <ul v-else class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
          <li class="nav-item">
            <router-link to="/feed" class="nav-link">
              <span class="fw-semibold text-dark"> Explore </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/appointments" class="nav-link">
              <span class="fw-semibold text-dark"> My Appointments </span>
            </router-link>
          </li>
          <li class="nav-item">
            <span
              v-on:click="signOut"
              class="nav-link fw-semibold text-dark"
              style="cursor: pointer"
              >Logout</span
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useUserStore } from "../stores/users.js";

export default {
  name: "NavBar",
  methods: {
    signOut() {
      signOut(getAuth()).then(() => {
        const user = useUserStore();
        user.logout();
        this.$router.push("/home");
      });
    },
    isLoggedIn(name) {
      if (["home", "login", "signup"].includes(name)) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss">
.navbar-nav {
  gap: 10px;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  border-bottom: 2px solid $yellow;
  margin: -1px;
}
</style>
