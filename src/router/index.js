import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CalendarView from "../views/CalendarView.vue";
import LoginSignUpView from "../views/LoginSignUpView.vue";
import FeedView from "../views/FeedView.vue";
import ShopView from "../views/ShopView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreateShopView from "../views/CreateShopView.vue";
import HairdresserFeedView from "../views/HairdresserFeedView.vue";
import AppointmentsView from "../views/AppointmentsView.vue";
import AppointmentView from "../views/AppointmentView.vue";
import ShopAppointmentsView from "../views/ShopAppointmentsView.vue";
import ProfileBody from "../views/ProfileView.vue";
import ChatView from "../views/ChatView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", name: "home", component: HomeView },
    {
      path: "/login",
      name: "login",
      component: LoginSignUpView,
      meta: {
        isLogin: true,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: LoginSignUpView,
      meta: {
        isLogin: false,
      },
    },
    {
      path: "/feed",
      name: "feed",
      component: FeedView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/shop/:id",
      name: "shop",
      component: ShopView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/booking/:id",
      name: "booking",
      component: CalendarView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/appointments",
      name: "appointments",
      component: AppointmentsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/appointment/:id",
      name: "appointment",
      component: AppointmentView,
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/", redirect: "/home" },
    {
      path: "/createshop",
      name: "createshop",
      component: CreateShopView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/hairdresserfeed",
      name: "hairdresserfeed",
      component: HairdresserFeedView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/shopappointments",
      name: "shopappointments",
      component: ShopAppointmentsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/hairdresserprofile",
      name: "hairdresserprofile",
      component: ProfileBody,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/chat/:uid",
      name: "chat",
      component: ChatView,
    },
  ],
});

const getCurrUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrUser()) {
      next();
    } else {
      alert("Please log in to access this page.");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
