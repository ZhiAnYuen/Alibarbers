<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-md-6 col-sm-12 align-self-center p-5 d-flex flex-column justify-content-evenly"
      >
        <h1>Singapore's No. 1 Hair Marketplace</h1>
        <p class="fs-5">Handling All Your Hair Needs</p>
        <div class="row justify-content-center">
          <div class="col-lg-6 col-xs-12">
            <a href="#customer-section" class="hover-button button">
              For Customers
            </a>
          </div>
          <div class="col-lg-6 col-xs-12">
            <a
              href="#hairdresser-section"
              type="button"
              class="hover-button button ms-auto"
            >
              For Hairdressers
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 align-self-center">
        <img class="img-fluid" src="../assets/main-image.PNG" alt="..." />
      </div>
    </div>
  </div>

  <div class="container-fluid" id="customer-section">
    <div class="p-5">
      <u class="text-start fw-semibold">For Customers</u>
      <h3 class="text-start fw-semibold mt-2">
        Enjoy Easy, Convenient & Accessible Hair Services
      </h3>

      <div class="row mt-4 mx-0">
        <div class="col-lg-4 col-sm-12 card rounded-4">
          <div class="card-body">
            <h5 class="card-title">
              <img src="../assets/icons8-earth-globe-100.png" class="image" />
            </h5>
            <h6 class="card-title"><b>Explore a New World</b></h6>
            <p class="card-text">
              Get all the hair services you want in one place. Explore new hair
              salons and hairdressers to find what works best for you!
            </p>
          </div>
        </div>

        <div class="col-lg-4 col-sm-12 card rounded-4">
          <div class="card-body">
            <h5 class="card-title">
              <img src="../assets/booking.png" class="image" />
            </h5>
            <h6 class="card-title"><b>Speedy Bookings</b></h6>
            <p class="card-text">
              Book appointments without the hassle of calling up the salon
              itself. Keep track of your upcoming appointments and add them to
              your google calendar!
            </p>
          </div>
        </div>

        <div class="col-lg-4 col-sm-12 card rounded-4">
          <div class="card-body">
            <h5 class="card-title">
              <img src="../assets/icons8-ask-question-100.png" class="image" />
            </h5>
            <h6 class="card-title"><b>Communicate via Chat</b></h6>
            <p class="card-text">
              Chat with hairdressers to clarify any doubts before you pay for
              the services!
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="hover-button button me-auto mt-4"
        v-on:click="$router.push('/signup')"
      >
        Get Started
      </button>
    </div>
  </div>
  <div>
    <div class="container-fluid" id="hairdresser-section">
      <div class="p-5">
        <div class="d-flex flex-column flex-end">
          <u class="text-end fw-semibold">For Hairdressers</u>
          <h3 class="text-end fw-semibold mt-2">
            Expand Your Reach & Generate Sales
          </h3>
        </div>
        <div class="row d-flex flex-row mx-0 mt-4">
          <div class="col-lg-4 col-sm-12 card rounded-4">
            <div class="card-body">
              <h5 class="card-title">
                <img src="../assets/icons8-customer-96.png" class="image" />
              </h5>
              <h6 class="card-title"><b>Allocate Manpower</b></h6>
              <p class="card-text">
                Receive appointments online instead of via call. View all your
                scheduled appointments easily using our calendar.
              </p>
            </div>
          </div>

          <div class="col-lg-4 col-sm-12 card rounded-4">
            <div class="card-body">
              <h5 class="card-title">
                <img
                  src="../assets/icons8-communication-100.png"
                  class="image"
                />
              </h5>
              <h6 class="card-title">
                <b>Clarify Doubts Directly</b>
              </h6>
              <p class="card-text">
                Directly reach out to customers via our chat function to resolve
                any queries or issues. Receive direct feedback on your services
                after appointments!
              </p>
            </div>
          </div>

          <div class="col-lg-4 col-sm-12 card rounded-4">
            <div class="card-body">
              <h5 class="card-title">
                <img src="../assets/icons8-combo-chart-100.png" class="image" />
              </h5>
              <h6 class="card-title"><br /><b>Store Analytics</b></h6>
              <p class="card-text">
                Analyse how well your store is doing with our dashboards.
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="hover-button button ms-auto mt-4"
          v-on:click="$router.push('/signup')"
        >
          Join Us
        </button>
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
#customer-section {
  background-color: $pastel-yellow;
}

#hairdresser-section {
  background-color: $blue;
}

.image {
  height: 4em;
  width: 4em;
  margin: 4px;
}
</style>
