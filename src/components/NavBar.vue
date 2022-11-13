<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link
        v-if="checkIsLoggedIn($route.name) == false"
        to="/home"
        class="navbar-brand ms-5 mt-1 h1"
      >
        AliBarbers
      </router-link>

      <router-link
        v-if="checkIsLoggedIn($route.name) == 'Customer'"
        to="/feed"
        class="navbar-brand ms-5 mt-1 h1"
      >
        AliBarbers
      </router-link>

      <router-link
        v-if="checkIsLoggedIn($route.name) == 'Hairdresser'"
        to="/hairdresserfeed"
        class="navbar-brand ms-5 mt-1 h1"
      >
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
          v-if="checkIsLoggedIn($route.name) == false"
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

        <!-- Navbar for Customers -->
        <ul
          v-if="checkIsLoggedIn($route.name) == 'Customer'"
          class="navbar-nav ms-auto mb-2 mb-lg-0 me-5"
        >
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
            <router-link to="/chat" class="nav-link">
              <span class="fw-semibold text-dark"> Chats </span>
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

        <!-- Navbar for Hairdressers -->
        <ul
          v-if="checkIsLoggedIn($route.name) == 'Hairdresser'"
          class="navbar-nav ms-auto mb-2 mb-lg-0 me-5"
        >
          <li class="nav-item">
            <router-link to="/hairdresserfeed" class="nav-link">
              <span class="fw-semibold text-dark"> Dashboard </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shopappointments" class="nav-link">
              <span class="fw-semibold text-dark"> My Appointments </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/chat" class="nav-link">
              <span class="fw-semibold text-dark"> Chats </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/hairdresserprofile" class="nav-link">
              <span class="fw-semibold text-dark"> My Profile </span>
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
import { computed } from "vue";

export default {
  name: "NavBar",
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
  methods: {
    signOut() {
      signOut(getAuth()).then(() => {
        const user = useUserStore();
        user.logout();
        this.$router.push("/home");
      });
    },
    goChat() {
      this.$router.push("/chat/" + this.userID);
    },
    checkIsLoggedIn(routeName) {
      if (["home", "login", "signup"].includes(routeName)) {
        return false;
      } else if (this.userType == "Hairdresser") {
        return "Hairdresser";
      } else {
        return "Customer";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-nav {
  gap: 10px;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  border-bottom: 2px solid $yellow;
  margin: -1px;
}
</style>
