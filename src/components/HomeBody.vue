<template>
  <div class="container-fluid vh-100">
    <div class="row align-items-center vh-100">
      <div class="col-md-6 align-self-center">
        <h1 class="text-center">Cut Your Hair Today</h1>
        <div class='row justify-content-center'>
          <div class="col-4">
        <button
          type="button"
          class="hover-button button mt-4 mb-4 mx-auto d-block"
          v-on:click="$router.push('/login')"
        >
        For Customers
        </button>
        </div>
        <div class="col-4">
        <button
        type="button"
        class="hover-button button mt-4 mb-4 mx-auto d-block"
        v-on:click="$router.push('/login')"
      >
        For Hairdressers
      </button>
      </div>
    </div>
      </div>
      <div class="col-md-6 align-self-center text-center">
        <img class="img-fluid" src="../assets/main-image.PNG" alt="..." />
      </div>
    </div>
  </div>

  <div class="container-fluid vh-100" id='customer'>
    <div class="row align-items-center vh-100">
      <div class="align-self-center">
        <h5>For Customers</h5>
        <h3>Enjoy Easy, Convenient & Accessible Hair Services</h3>
        <div class="row justify-content-center">
          <div class="col-3 text-center whiteBox">
            Box 1
          </div>
          <div class="col-3 text-center whiteBox">
            Box 2
          </div>
          <div class="col-3 text-center whiteBox">
            Box 3
          </div>
        </div>
        <button
          type="button"
          class="hover-button button mt-4 mb-4 mx-auto d-block"
          v-on:click="$router.push('/signup')"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
  <div>
    <div class="container-fluid vh-100" id='hairdresser'>
      <div class="row align-items-center vh-100">
        <div class="align-self-center">
        <h5>For Hairdressers</h5>
        <h3>Expand Your Reach & Generate Sales</h3>
        <div class="row justify-content-center">
          <div class="col-3 text-center whiteBox">
            Box 1
          </div>
          <div class="col-3 text-center whiteBox">
            Box 2
          </div>
          <div class="col-3 text-center whiteBox">
            Box 3
          </div>
        </div>
        <button
          type="button"
          class="hover-button button mt-4 mb-4 mx-auto d-block"
          v-on:click="$router.push('/signup')"
        >
          Join Us
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBody",
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 60px;
}

h3{
  font-weight: bold;
}

h5{
  text-decoration: underline;
  font-weight: bold;
}

#customer {
  background-color: #ffe69a;
  
}

#hairdresser {
  background-color: #92b4ec;
}

.whiteBox {
  background-color: white;
  width: 20em;
  height: 15em;
  margin: 1em;
  border-radius: 20%;
}
</style>
