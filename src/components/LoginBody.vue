<template>
  <div id="login-body" class="container-fluid vh-100">
    <div class="row vh-100 align-items-center">
      <div class="col-6"></div>
      <div class="col-6">
        <div id="card" class="card m-5 border border-dark rounded-4">
          <div class="card-body p-5">
            <h1>Welcome Back!</h1>
            <p>Sign in to your account below.</p>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
              />
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Password"
                aria-label="Password"
              />
            </div>
            <p>Forgot Password?</p>
            <button
              id="get-started-button"
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
}

span {
  font-weight: bold;
  text-decoration: underline;
}

#get-started-button {
  align-items: center;
  background-color: black;
  border: 2px solid black;
  border-radius: 8px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:after {
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;
    content: "";
    display: block;
    height: 48px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
    transition: transform 0.2s ease-out;
    z-index: -1;
  }

  &:hover {
    &:after {
      transform: translate(0, 0);
    }
    outline: 0;
  }

  &:active {
    color: black;
    background-color: $yellow;
    outline: 0;
  }
}

@media (min-width: 768px) {
  #get-started-button {
    padding: 0 40px;
  }
}
// #card {
//   height: 500px;
// }
</style>
