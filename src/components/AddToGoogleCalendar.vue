<template>
  <div class="mt-4">
    <button
      type="button"
      class="btn w-100 border border-dark rounded-4"
      v-if="!addedToGoogleCalendar && !addingToGoogleCalendar"
      @click="addToGoogleCal"
    >
      <img width="40" class="px-1" src="../assets/googleCalendar.png"/>
      Add to Google Calendar
    </button>
    <button
      type="button"
      class="btn w-100 border border-dark rounded-4"
      disabled
      v-if="addedToGoogleCalendar"
    >
      <img width="40" class="px-1" src="../assets/googleCalendar.png" />
      Added to your Google Calendar!
    </button>
    <button
      type="button"
      class="btn w-100 border border-dark rounded-4 d-flex justify-content-center align-items-center"
      v-if="addingToGoogleCalendar"
    >
      <div class="spinner-border me-2" role="status"></div>
      Adding to your Google Calendar!
    </button>
  </div>
</template>

<script>
const CLIENT_ID =
  "357278563537-alpo25u2cdl470r9p00siu1ub3rhoc6t.apps.googleusercontent.com";
const API_KEY = "AIzaSyDLDs4YzPHLUHXA6eztyjLyntTUZE_-9k8";
const DISCOVERY_DOC = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";

export default {
  name: "AddToGoogleCalendar",
  props: ["start", "end", "shopName"],
  data() {
    return {
      tokenClient: undefined,
      addingToGoogleCalendar: false,
      addedToGoogleCalendar: false,
    };
  },
  mounted() {
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
    });

    window.gapi.load("client", async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOC,
      });
    });
  },
  methods: {
    addToGoogleCal() {
      this.addingToGoogleCalendar = true;
      this.tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }

        function ISODateString(d) {
          function pad(n) {
            return n < 10 ? "0" + n : n;
          }
          return (
            d.getUTCFullYear() +
            "-" +
            pad(d.getUTCMonth() + 1) +
            "-" +
            pad(d.getUTCDate()) +
            "T" +
            pad(d.getUTCHours()) +
            ":" +
            pad(d.getUTCMinutes()) +
            ":" +
            pad(d.getUTCSeconds()) +
            "Z"
          );
        }

        var startDate = new Date(this.start);
        var endDate = new Date(this.end);
        const googleCalEvent = {
          summary: "Appointment at " + this.shopName,
          start: {
            dateTime: ISODateString(startDate),
            timeZone: "Asia/Singapore",
          },
          end: {
            dateTime: ISODateString(endDate),
            timeZone: "Asia/Singapore",
          },
        };

        const request = window.gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: googleCalEvent,
        });

        request.execute((event) => {
          this.addingToGoogleCalendar = false;
          this.addedToGoogleCalendar = true;
          //console.log("Event created:" + event.htmlLink);
        });
      };

      if (window.gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        this.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        this.tokenClient.requestAccessToken({ prompt: "" });
      }
    },
  },
};
</script>
