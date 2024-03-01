// src/store/playerInfo.js
import { defineStore } from 'pinia';

export const usePlayerInfoStore = defineStore('playerInfo', {
  state: () => ({
    isAuthenticated: false,
    username: null,
    password: null,
    rareCandy: 0,
    badges: [false, false, false, false, false, false, false, false], // Initialize badges array
  }),

  getters: {
    badgeCase() {
      return this.badges; // Return the badges array
    },
  },

  actions: {
    login(username, password) {
      // Replace this with your actual authentication logic
      const isValidUser = this.validateUser(username, password);

      if (isValidUser) {
        this.isAuthenticated = true;
        this.username = username;
        this.password = password; // Store the password
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.username = null;
      this.password = null; // Clear the password on logout
    },

    validateUser(username, password) {
      // Replace this with your actual validation logic using a service or API
      // For demonstration purposes, we are accepting any non-empty username and password
      return username.trim() !== '' && password.trim() !== '';
    },
  },
});
