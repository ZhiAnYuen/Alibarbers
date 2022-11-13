<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col-md-6 col-sm-12 align-self-center">
        <h1 class="text-center col-12">Singapore's No. 1</h1>
        <h1 class="text-center col-12">Hair Marketplace</h1>
        <h3 class="text-center text-muted m-4">Handling All Your Hair Needs</h3>
        <div class="row justify-content-center">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <a href="#customer">
            <button
              type="button"
              class="hover-button button mt-4 mb-4 mx-auto d-block"
            >
              For Customers
            </button>
          </a>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <a href="#hairdresser">
            <button
              type="button"
              class="hover-button button mt-4 mb-4 mx-auto d-block"
            >
              For Hairdressers
            </button>
          </a>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 align-self-center text-center">
        <img class="img-fluid" src="../assets/main-image.PNG" alt="..." />
      </div>
    </div>
  </div>

  <div class="container-fluid" id="customer">
    <div class="row align-items-center">
      <div class="align-self-center">
        <h5 class="colouredHeader">For Customers</h5>
        <h3 class="colouredSubHeader">
          Enjoy Easy, Convenient & Accessible Hair Services
        </h3>

        <div class="row justify-content-center">
          <div class="card col-sm-4">
            <div class="card-body">
              <h5 class="card-title">
                <img src="../assets/icons8-earth-globe-100.png" class="image" />
              </h5>
              <h6 class="card-title mb-4"><br /><b>Explore a New World</b></h6>
              <p class="card-text">
                Get all the hair services you want in one place. Explore new
                hair salons and hairdressers to find what works best for you!
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <img src="../assets/booking.png" class="image" />
              </h5>
              <h6 class="card-title mb-4"><br /><b>Speedy Bookings</b></h6>
              <p class="card-text">
                Book appointments without the hassle of calling up the salon
                itself. Keep track of your upcoming appointments and add them to
                your google calendar!
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <img
                  src="../assets/icons8-ask-question-100.png"
                  class="image"
                />
              </h5>
              <h6 class="card-title mb-4"><br /><b>Communicate via Chat</b></h6>
              <p class="card-text">
                Chat with hairdressers to clarify any doubts before you pay for
                the services!
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="hover-button button mt-4 mb-4 mx-auto d-block"
          style="position: absolute; width:fit-content;"
          v-on:click="$router.push('/signup')"
        >
          Get Started
        </button>
      </div>
    </div>
    
  </div>
  <div>
    <div class="container-fluid" id="hairdresser">
      <div class="row align-items-center">
        <div class="align-self-center">
          <h5 class="colouredHeader" s>For Hairdressers</h5>
          <h3 class="colouredSubHeader">Expand Your Reach & Generate Sales</h3>
          <div class="row justify-content-center">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <img src="../assets/icons8-customer-96.png" class="image" />
                </h5>
                <h6 class="card-title mb-4"><br /><b>Allocate Manpower</b></h6>
                <p class="card-text">
                  Receive appointments online instead of via call. View all your
                  scheduled appointments easily using our calendar.
                </p>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <img
                    src="../assets/icons8-communication-100.png"
                    class="image"
                  />
                </h5>
                <h6 class="card-title mb-4">
                  <br /><b>Clarify Doubts Directly</b>
                </h6>
                <p class="card-text">
                  Directly reach out to customers via our chat function to
                  resolve any queries or issues. Receive direct feedback on your
                  services after appointments!
                </p>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <img
                    src="../assets/icons8-combo-chart-100.png"
                    class="image"
                  />
                </h5>
                <h6 class="card-title mb-4"><br><b>Store Analytics</b></h6>
                <p class="card-text">
                  Analyse how well your store is doing with our dashboards.
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="hover-button button mt-4 mb-4"
            style="position: absolute; right:4em; width:fit-content;"
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
  font-size: 3em;
  font-weight: bold;
}

h3 {
  font-weight: bold;
}

h5 {
  text-decoration: underline;
  font-weight: bold;
}

a {
      text-decoration:none;
   }

#customer {
  background-color: #ffe69a;
}

#hairdresser {
  background-color: #92b4ec;
  text-align: right;
}

.image {
  height: 4em;
  width: 4em;
  margin: 4px;
}

.card {
  border-radius: 15%;
  width: 20em;
  height: 20em;
  margin: 2em;
}

.colouredHeader {
  margin-left: 4rem;
  margin-right: 4rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.colouredSubHeader {
  margin-left: 4rem;
  margin-right: 4rem;
}
</style>
