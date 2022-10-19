import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    isLoggedIn: false,
    userType: "",
  }),
  actions: {
    login(name, email, userType) {
      this.$patch({
        name: name,
        email: email,
        isLoggedIn: true,
        userType: userType,
      });
    },
    logout() {
      this.$reset();
    },
  },
  persist: true,
});
