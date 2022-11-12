<template>
  <div v-for="(hairdresser, index) in hairdressers" :key="index">
    <div class="row">
      <div class="col-md-6 text-center">
        <p>{{ hairdresser["name"] }}</p>
      </div>
      <div class="col-md-6 text-center">
        <p>
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
