<template>
  <!-- <h3 class="text-center mb-4">Services Provided</h3> -->
  <div v-for="(service, index) in services" :key="index">
    <div class="row justify-content-center m-3">
      <div class="col-md-4 text-center">
        <p class="fs-5 fw-light">{{ service["name"] }}</p>
      </div>
      <div class="col-md-4 text-center">
        <p class="fs-5 fw-light">
          ${{ service["price"] }}, {{ service["duration"] }} mins
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesBody",
  props: ["services"],
};
</script>
