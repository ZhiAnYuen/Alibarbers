import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGx9onhnjCYGfE-nizcuGc6JckEkf6jpw",
  authDomain: "alibarber-9dfc5.firebaseapp.com",
  projectId: "alibarber-9dfc5",
  storageBucket: "alibarber-9dfc5.appspot.com",
  messagingSenderId: "358955090781",
  appId: "1:358955090781:web:4cd91fd7529781a1cd5eb4",
  measurementId: "G-CP0XDG5FDV",
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
