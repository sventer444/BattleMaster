// src/store/playerInfo.js
import { defineStore } from 'pinia';

export const usePlayerInfoStore = defineStore('playerInfo', {
  state: () => ({
    isAuthenticated: false,
    username: null,
    password: null,
    rareCandy: 0,
    badges: [false, false, false, false, false, false, false, false], // Initialize badges array
    locationsWhitelist: ['Professors Lab'], // Initialize with Professor's Lab
    playerTeam: [],
    playerPc: [],
  }),

  getters: {
    badgeCase() {
      return this.badges; // Return the badges array
    },
    getPlayerTeam() {
      return this.playerTeam;
    },
    getPlayerPc() {
      return this.playerPc;
    }
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

    addToPlayerTeam(pokemonDetails) {
      // Check if the Pokémon is not already in the team before adding
      if (!this.playerTeam.some((pokemon) => pokemon.id === pokemonDetails.id)) {
        this.playerTeam.push(pokemonDetails);
      }
    },

    addToLocationWhitelist(locationName) {
      // Check if the location is not already in the whitelist before adding
      if (!this.locationsWhitelist.includes(locationName)) {
        this.locationsWhitelist.push(locationName);
      }
    },

    addToPlayerPc(pokemonDetails) {
      // Check if the Pokémon is not already in the PC before adding
      if (!this.playerPc.some((pokemon) => pokemon.id === pokemonDetails.id)) {
        this.playerPc.push(pokemonDetails);
      }
    },
  },
});
