import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      data: "",
      isLogin: false,
      user: {},
    };
  },
  getters: {},
  actions: {},
  persist: { enabled: true },
});
