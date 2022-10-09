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
export default {
  name: "LoginBody",
  methods: {
    submit() {
      console.log(document.getElementById("username").value);
      console.log(document.getElementById("password").value);
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
