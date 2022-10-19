<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
export default {
  name: "CalendarBody",
  data() {
    return {
      step: 1,
      hairdressers: [
        {
          name: "Natalie",
          role: "Colorist Specialist",
        },
        {
          name: "Zhi An",
          role: "Senior Hairstylist",
        },
        {
          name: "Cara",
          role: "Junior Barber",
        },
      ],
      services: [
        {
          name: "Hair Treatment",
          duration: 240,
          price: 60,
        },
        {
          name: "Hair Styling",
          duration: 20,
          price: 30,
        },
        {
          name: "Women's Hair Cut",
          duration: 45,
          price: 45,
        },
        {
          name: "Men's Hair Cut",
          duration: 30,
          price: 35,
        },
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
      draggable: {
        id: 1,
        title: "My Appointment",
        duration: 60,
      },
      selectedHairdressers: [],
      selectedServices: [],
    };
  },
  methods: {
    onSelectHairdresser(hairdresser) {
      const index = this.selectedHairdressers.indexOf(hairdresser);
      if (index > -1) {
        // only splice array when item is found
        this.selectedHairdressers.splice(index, 1); // 2nd parameter means remove one item only
      } else {
        this.selectedHairdressers.push(hairdresser);
      }
      console.log(this.selectedHairdressers);
    },
    onEventDragStart(e, draggable) {
      e.dataTransfer.setData("event", JSON.stringify(draggable));
      e.dataTransfer.setData("cursor-grab-at", e.offsetY);
    },
    onEventDrop({ originalEvent, external }) {
      if (external) {
        const extEventToDeletePos = this.draggables.findIndex(
          (item) => item.id === originalEvent.id
        );
        if (extEventToDeletePos > -1)
          this.draggables.splice(extEventToDeletePos, 1);
      }
    },
    test() {
      console.log(this.selectedHairdressers);
      console.log(this.selectedServices);
    },
  },
  computed: {
    totalDuration() {
      var calculatedDuration = this.selectedServices.reduce(
        (accumulator, value) => {
          return accumulator + value;
        },
        0
      );
      this.draggable.duration = calculatedDuration;
      return calculatedDuration;
    },
  },
  components: {
    VueCal,
  },
};
</script>

<template>
  <div id="calendar-body" class="container-fluid vh-100">
    <div class="row align-items-center">
      <div
        class="col-lg-5 col-md-6 card border border-dark rounded-4 m-5"
        v-if="step === 1"
      >
        <div class="card-body p-5">
          <h2>Step 1: Choose your hairdresser(s)</h2>
          <div
            v-for="person in hairdressers"
            :key="person.name"
            class="border border-dark rounded-4 p-2 d-flex flex-row my-3"
          >
            <input
              type="checkbox"
              :value="person.name"
              :id="person.name"
              class="m-3"
              v-model="selectedHairdressers"
            />
            <label :for="person.name"
              ><strong>{{ person.name }}</strong>
              <span class="d-block">{{ person.role }}</span>
            </label>
          </div>
          <button
            type="button"
            class="hover-button button mt-4 mb-4 ms-auto"
            @click="step += 1"
          >
            Next
          </button>
        </div>
      </div>
      <div
        class="col-lg-5 col-md-6 card border border-dark rounded-4 m-5"
        v-if="step === 2"
      >
        <div class="card-body p-5">
          <h2>Step 2: Choose your service(s)</h2>
          <div
            v-for="service in services"
            :key="service.name"
            class="border border-dark rounded-4 p-2 my-3 d-flex flex-row"
          >
            <input
              type="checkbox"
              :value="service.duration"
              :id="service.name"
              class="mx-3"
              v-model="selectedServices"
            />
            <label :for="service.name">
              <strong>{{ service.name }}</strong></label
            >
            <label :for="service.name" class="ms-auto"
              >{{ service.price }}
            </label>
          </div>
          <div class="d-flex flex-row">
            <button
              type="button"
              class="hover-button button my-4"
              @click="step -= 1"
            >
              Back
            </button>
            <button
              type="button"
              class="hover-button button my-4 ms-auto"
              @click="step += 1"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div v-if="step === 3" class="row mt-5 px-5">
        <div class="col-lg-4 col-md-12">
          <div class="card border border-dark rounded-4">
            <div class="p-5">
              <h2>
                Step 3: Drag and drop the event below to select your appointment
                time
              </h2>
              <div class="d-flex flex-row justify-content-center py-3">
                <div
                  class="external-event p-2"
                  draggable="true"
                  @dragstart="onEventDragStart($event, draggable)"
                  :key="draggable.id"
                >
                  <strong>{{ draggable.title }}</strong>
                  <div>
                    {{ totalDuration ? `${totalDuration} min` : "no duration" }}
                  </div>
                </div>
              </div>
              <div class="d-flex flex-row">
                <button
                  type="button"
                  class="hover-button button mt-4 mb-4"
                  @click="step -= 1"
                >
                  Back
                </button>
                <button
                  type="button"
                  class="hover-button button mt-4 mb-4 ms-auto"
                  @click="test"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-12">
          <div class="card border border-dark rounded-4 h-0">
            <VueCal
              class="h-50 m-5"
              startWeekOnSunday="true"
              :disable-views="['years', 'year', 'month']"
              :time-from="10 * 60"
              :time-to="19 * 60"
              :time-step="30"
              :events="events"
              stickySplitLabels="true"
              snapToTime="15"
              @event-drop="onEventDrop"
              :editable-events="{
                title: false,
                drag: true,
                resize: false,
                delete: true,
                create: false,
              }"
              minCellWidth="120"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#calendar-body {
  background-color: $pastel-yellow;
  background-image: url("../assets/scissor.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1100px;
}

.external-event {
  border-top: 4px solid black;
  width: 150px;
  height: 100px;
  background-color: white;
  filter: drop-shadow(5px 5px 4px grey);
}

.vuecal__event {
  background-color: white;
  font-size: 14px;
  border-top: 4px solid black;
}

.vuecal__event.zhi-an {
  border-top: 6px solid $yellow;
}

.vuecal__event.natalie {
  border-top: 6px solid $blue;
}
</style>
