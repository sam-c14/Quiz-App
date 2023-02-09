import { defineStore } from "pinia";

export const useNavbarStore = defineStore("navbar", {
  state: () => ({
    isScrollListenerAdded: false,
  }),
  getters: {
    listenerStatus: (state) => state.isScrollListenerAdded,
  },
  actions: {
    setListenerStatus(payload) {
      this.isScrollListenerAdded = payload;
    },
  },
});
