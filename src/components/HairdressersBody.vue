<template>
  <div v-for="(hairdresser, index) in hairdressers" :key="index">
    <div class="card mb-4">
      <div class="card-body">
        <span class="card-title fs-4 fw-semibold mb-2">{{
          hairdresser["name"]
        }}</span>
        <br />
        <span>{{ hairdresser["role"] }}</span>
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
