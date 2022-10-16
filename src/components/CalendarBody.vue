<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <CalendarModal :show="createEventForm" @close="createEventForm = false">
      <template #header>
        <h3>{{ salonName }}</h3>
      </template>
    </CalendarModal>
  </Teleport>
  <div class="mx-5 d-block">
    <h3>Book Your Appointment for {{ salonName }}</h3>
    <button class="hover-button" @click="createEvent()">Book Now</button>
  </div>
  <VueCal
    class="h-500 m-5 vuecal--green-theme"
    :startWeekOnSunday="true"
    :disable-views="['years', 'year', 'month']"
    :time-from="10 * 60"
    :time-to="19 * 60"
    :time-step="30"
    :events="events"
    :stickySplitLabels="true"
    :split-days="hairdressers"
    :snap-to-time="15"
    @cell-click="createEvent($event)"
  />
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import CalendarModal from "./CalendarModal.vue";

export default {
  name: "CalendarBody",
  data() {
    return {
      true: true,
      createEventForm: false,
      salonName: "Team Salon @ Siglap",
      hairdressers: [
        { id: 1, class: "natalie", label: "Natalie" },
        { id: 2, class: "zhi-an", label: "Zhi An" },
      ],
      events: [
        {
          start: "2022-10-14 10:30",
          end: "2022-10-14 11:30",
          class: "natalie",
          split: 1,
        },
        {
          start: "2022-10-14 13:30",
          end: "2022-10-14 15:30",
          class: "zhi-an",
          split: 2,
        },
        {
          start: "2022-10-14 14:30",
          end: "2022-10-14 18:30",
          class: "natalie",
          split: 3,
        },
        {
          start: "2022-10-14 15:30",
          end: "2022-10-14 16:30",
          class: "zhi-an",
          split: 4,
        },
      ],
    };
  },
  methods: {
    createEvent(event) {
      var dateTime = Date(event);
      console.log(dateTime);
      this.createEventForm = true;
      var newEvent = this.$refs.vuecal.createEvent(
        // Formatted start date and time or JavaScript Date object.
        dateTime,
        // Event duration in minutes (Integer).
        120,
        // Custom event props (optional).
        { title: "New Event", content: "yay! 🎉", class: "zhi-an" }
      );
      console.log(newEvent);
    },
  },
  components: {
    VueCal,
    CalendarModal,
  },
};
</script>

<style lang="scss">
.vuecal__event {
  background-color: white;
  font-size: 14px;
}

.vuecal__event.zhi-an {
  border-top: 6px solid $yellow;
}

.vuecal__event.natalie {
  border-top: 6px solid $blue;
}
</style>
