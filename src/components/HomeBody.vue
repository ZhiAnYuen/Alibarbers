<template>
  <div class="container-fluid p-5">
    <div class="row">
      <div class="col-md-6 col-sm-12 align-self-center">
        <div class="d-flex flex-column">
          <h1>Singapore's No. 1 Hair Marketplace</h1>
          <p class="fs-5">Handling All Your Hair Needs</p>
          <div class="row gy-4 pb-4">
            <div class="col-lg-6 col-xs-12 w-auto">
              <a href="#customer-section" class="hover-button button">
                For Customers
              </a>
            </div>
            <div class="col-lg-6 col-xs-12 w-auto">
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
      </div>
      <div class="col-md-6 col-sm-12 align-self-center">
        <img class="img-fluid" src="../assets/main-image.jpg" alt="..." />
      </div>
    </div>
  </div>

  <div class="container-fluid" id="globe-section">
    <div class="row gy-4 py-5">
      <div class="col-lg-3 col-md-6 col-sm-12 text-center">
        <h3 class="fw-bold my-0">100+</h3>
        <span>service providers</span>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 text-center">
        <h3 class="fw-bold my-0">3,000+</h3>
        <span>services available</span>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 text-center">
        <h3 class="fw-bold my-0">500+</h3>
        <span>customers onboarded</span>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 text-center">
        <h3 class="fw-bold my-0">2,000+</h3>
        <span>appointments delivered</span>
      </div>
    </div>
  </div>

  <div class="container-fluid p-5" id="customer-section">
    <u class="text-start fw-semibold">For Customers</u>
    <h3 class="text-start fw-semibold mt-2">
      Enjoy Easy, Convenient & Accessible Hair Services
    </h3>

    <div class="row px-0 gy-2 gx-2 mt-4 mx-0">
      <div class="col-lg-4 col-sm-12">
        <div class="card rounded-4 h-100">
          <div class="card-body">
            <h5 class="card-title">
              <img
                src="../assets/icons8-earth-globe-100.png"
                class="image"
                @mouseover="exploreIsHovering = true"
                @mouseout="exploreIsHovering = false"
                :class="{ gelatine: exploreIsHovering }"
              />
            </h5>
            <h6 class="card-title"><b>Explore a New World</b></h6>
            <p class="card-text">
              Get all the hair services you want in one place. Explore new hair
              salons and hairdressers to find what works best for you!
            </p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-sm-12">
        <div class="card rounded-4 h-100">
          <div class="card-body">
            <h5 class="card-title">
              <img
                src="../assets/booking.png"
                class="image"
                @mouseover="speedyIsHovering = true"
                @mouseout="speedyIsHovering = false"
                :class="{ shake: speedyIsHovering }"
              />
            </h5>
            <h6 class="card-title"><b>Speedy Bookings</b></h6>
            <p class="card-text">
              Book appointments without the hassle of calling up the salon
              itself. Keep track of your upcoming appointments and add them to
              your google calendar!
            </p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-sm-12">
        <div class="card rounded-4 h-100">
          <div class="card-body">
            <h5 class="card-title">
              <img
                src="../assets/icons8-ask-question-100.png"
                class="image"
                @mouseover="communicateIsHovering = true"
                @mouseout="communicateIsHovering = false"
                :class="{ hithere: communicateIsHovering }"
              />
            </h5>
            <h6 class="card-title"><b>Communicate via Chat</b></h6>
            <p class="card-text">
              Chat with hairdressers to clarify any doubts before you pay for
              the services!
            </p>
          </div>
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
  <div class="container-fluid p-5" id="hairdresser-section">
    <div class="d-flex flex-column flex-end">
      <u class="text-end fw-semibold">For Hairdressers</u>
      <h3 class="text-end fw-semibold mt-2">
        Expand Your Reach & Generate Sales
      </h3>
    </div>

    <div class="gy-2 gx-2 row px-0 mx-0 mt-4">
      <div class="col-lg-4 col-sm-12">
        <div class="card rounded-4 h-100">
          <div class="card-body">
            <h5 class="card-title">
              <img
                src="../assets/icons8-customer-96.png"
                class="image"
                @mouseover="allocateIsHovering = true"
                @mouseout="allocateIsHovering = false"
                :class="{ gelatine: allocateIsHovering }"
              />
            </h5>
            <h6 class="card-title"><b>Allocate Manpower</b></h6>
            <p class="card-text">
              Receive appointments online instead of via call. View all your
              scheduled appointments easily using our calendar.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-12">
        <div class="card rounded-4 h-100">
          <div class="card-body">
            <h5 class="card-title">
              <img
                src="../assets/icons8-communication-100.png"
                class="image"
                @mouseover="clarifyIsHovering = true"
                @mouseout="clarifyIsHovering = false"
                :class="{ shake: clarifyIsHovering }"
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
      </div>

      <div class="col-lg-4 col-sm-12">
        <div class="card rounded-4 h-100">
          <div class="card-body">
            <h5 class="card-title">
              <img
                src="../assets/icons8-combo-chart-100.png"
                class="image"
                @mouseover="analyticsIsHovering = true"
                @mouseout="analyticsIsHovering = false"
                :class="{ hithere: analyticsIsHovering }"
              />
            </h5>
            <h6 class="card-title"><b>Store Analytics</b></h6>
            <p class="card-text">
              Analyse how well your store is doing with our dashboards.
            </p>
          </div>
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
</template>

<script>
export default {
  name: "HomeBody",
  data() {
    return {
      exploreIsHovering: false,
      speedyIsHovering: false,
      communicateIsHovering: false,
      allocateIsHovering: false,
      clarifyIsHovering: false,
      analyticsIsHovering: false,
    };
  },
};
</script>

<style lang="scss" scoped>
#customer-section {
  background-color: $pastel-yellow;
}

#hairdresser-section {
  background-color: $blue;
}

#globe-section {
  background-image: url("https://global-uploads.webflow.com/5e98141e958d596eea9190c5/633fad9c687ae463bda79d94_world-map-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.image {
  height: 4em;
  width: 4em;
  margin: 4px;
  margin-bottom: 10px;
}

.card {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
}

.gelatine {
  animation: gelatine 0.5s infinite;
}
@keyframes gelatine {
  from,
  to {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}

.shake {
  animation: shake 2s ease infinite;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}

.hithere {
  animation: hithere 1s ease infinite;
}
@keyframes hithere {
  30% {
    transform: scale(1.2);
  }
  40%,
  60% {
    transform: rotate(-20deg) scale(1.2);
  }
  50% {
    transform: rotate(20deg) scale(1.2);
  }
  70% {
    transform: rotate(0deg) scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
