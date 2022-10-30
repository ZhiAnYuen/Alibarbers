<template>
  <div
    class="border border-dark rounded-4 d-flex flex-row justify-content-between align-items-center p-4 bg-white mb-3"
  >
    <div class="d-flex flex-row align-items-center">
      <img :src="appointmentData.imgLink" height="50" width="80" />
      <div class="d-flex flex-column ps-4">
        <span class="shop-name">{{ appointmentData.shopName }}</span>
        <span>{{ appointmentData.location }}</span>
      </div>
    </div>
    <div class="d-flex flex-row align-items-center">
      <img src="../assets/icons8-planner-24.png" width="32" height="32" />
      <div class="d-flex flex-column ps-4">
        <span class="upper-row">{{ appointmentDate }}</span>
        <span>{{ appointmentTime }}</span>
      </div>
    </div>
    <div class="d-flex flex-row align-items-center">
      <img src="../assets/icons8-user-32.png" width="32" height="32" />
      <div class="d-flex flex-column ps-4">
        <span class="upper-row">{{
          appointmentData.selectedHairdresser.name
        }}</span>
        <span>{{ appointmentData.selectedHairdresser.role }}</span>
      </div>
    </div>
    <button v-if="type === 'upco'" class="hover-button">Cancel</button>
    <button v-else class="hover-button">Review</button>
  </div>
</template>

<script>
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default {
  name: "AppointmentDisplay",
  props: { appointmentData: Object, type: String },
  computed: {
    appointmentDate() {
      var start = new Date(this.appointmentData.start);
      return (
        start.getDate() +
        " " +
        months[start.getMonth()] +
        " " +
        start.getFullYear()
      );
    },
    appointmentTime() {
      var start = new Date(this.appointmentData.start);
      var end = new Date(this.appointmentData.end);
      return (
        String(start.getHours()).padStart(2, "0") +
        ":" +
        String(start.getMinutes()).padStart(2, "0") +
        " - " +
        String(end.getHours()).padStart(2, "0") +
        ":" +
        String(end.getMinutes()).padStart(2, "0")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-name {
  font-weight: 700;
}

.upper-row {
  font-weight: 500;
}
</style>
