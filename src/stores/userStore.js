// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 'id123',
  }),
  actions: {
    setUserId(id) {
      this.userId = id;
    },
  },
});
 