import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CalendarView from "../views/CalendarView.vue";
import LoginSignUpView from "../views/LoginSignUpView.vue";
import FeedView from "../views/FeedView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/", redirect: "/home" },
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
      next("/auth");
    }
  } else {
    next();
  }
});

export default router;
