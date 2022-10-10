import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import FeedView from "../views/FeedView.vue";
import SignUpView from "../views/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUpView,
    },
    {
      path: "/feed",
      name: "feed",
      component: FeedView,
    },
    { path: "/", redirect: "/home" },
  ],
});

export default router;
