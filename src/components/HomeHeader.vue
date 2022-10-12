<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link to="/home" class="navbar-brand ms-5 h1">
        Alibarbers
      </router-link>
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
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HomeHeader",
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
