<template>
  <div class="input-group my-3 border border-dark rounded p-3 d-table">
    <h4>{{ inputFor }}</h4>
    <select class="custom-select border border-dark rounded">
      <option v-for="item in selectOptions" :key="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CalendarOption",
  data() {
    return {
      inputValue: "",
    };
  },
  props: {
    inputFor: String,
    selectOptions: Array,
  },
};
</script>

<style lang="scss" scoped></style>
