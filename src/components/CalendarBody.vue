<template>
  <VueCal
    class="h-500 m-5 vuecal--green-theme"
    :minDate="mindate"
    :startWeekOnSunday="true"
    :disable-views="['years', 'year', 'month']"
    :time-from="10 * 60"
    :time-to="19 * 60"
    :time-step="30"
    :events="events"
    :stickySplitLabels="true"
    :split-days="hairdressers"
    :min-cell-width="500"
  />
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "CalendarBody",
  components: {
    VueCal,
  },
  data() {
    return {
      mindate: new Date().getDate(),
      true: true,
      hairdressers: [
        { id: 1, class: "natalie", label: "Natalie" },
        { id: 2, class: "zhi-an", label: "Zhi An" },
      ],
      events: [
        {
          start: "2022-10-14 10:30",
          end: "2022-10-14 11:30",
          title: "Natalie",
          content: '<i class="icon material-icons">shopping_cart</i>',
          class: "natalie",
          split: 1,
        },
        {
          start: "2022-10-14 13:30",
          end: "2022-10-14 15:30",
          title: "Zhi An",
          content: '<i class="icon material-icons">shopping_cart</i>',
          class: "zhi-an",
          split: 2,
        },
        {
          start: "2022-10-14 14:30",
          end: "2022-10-14 18:30",
          title: "Natalie",
          content: '<i class="icon material-icons">shopping_cart</i>',
          class: "natalie",
          split: 3,
        },
        {
          start: "2022-10-14 15:30",
          end: "2022-10-14 16:30",
          title: "zhi-an",
          content: '<i class="icon material-icons">shopping_cart</i>',
          class: "zhi-an",
          split: 4,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: $yellow;
}
.vuecal__event.zhi-an {
  background-color: yellow;
}

.vuecal__event.natalie {
  background-color: green;
}
</style>
