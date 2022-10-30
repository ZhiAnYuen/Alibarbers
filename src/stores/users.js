import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    isLoggedIn: false,
    userType: "",
    userID: "",
  }),
  actions: {
    login(name, email, userType, userID) {
      this.$patch({
        name: name,
        email: email,
        isLoggedIn: true,
        userType: userType,
        userID: userID,
      });
    },
    storeUserID(userID) {
      this.$patch({
        userID: userID,
      });
    },
    logout() {
      this.$reset();
    },
  },
  persist: true,
});
