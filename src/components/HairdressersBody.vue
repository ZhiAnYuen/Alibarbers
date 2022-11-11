<template>
  <div v-for="(hairdresser, index) in hairdressers" :key="index">
    <div class="row justify-content-center m-3">
      <div class="col-md-4 text-center">
        <p class="fs-5 fw-light">{{ hairdresser["name"] }}</p>
      </div>
      <div class="col-md-4 text-center">
        <p class="fs-5 fw-light">
          {{ hairdresser["role"] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HairdressersBody",
  props: ["hairdressers"],
};
</script>
