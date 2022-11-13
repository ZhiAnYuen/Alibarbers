<template>
  <!-- <h3 class="text-center mb-4">Services Provided</h3> -->
  <div v-for="(service, index) in services" :key="index">
    <div class="card mb-4">
      <div class="card-body">
        <span class="card-title fs-4 fw-semibold mb-2">{{
          service["name"]
        }}</span>
        <br />
        <span>${{ service["price"] }}</span
        ><br />
        <span>{{ service["duration"] }} mins</span>
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

<style lang="scss" scoped>

</style>
