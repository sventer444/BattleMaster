// src/store/pokedex.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokedexStore = defineStore({
  id: 'pokedex',

  state: () => ({
    pokedex: [], // Array to store Pokemon names in the Pokedex
    regionDex: [],
  }),

  getters: {
    accessPokedex() {
      return this.pokedex; // Return the players pokedex array
    },
    getRegionDex() {
      return this.regionDex; // Return the region dex array
    },
  },

  actions: {
    // Fetch details for a single Pokemon by Name
    async fetchPokemonDetailsByName(pokemonName) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching details for Pokemon ID ${pokemonName}:`, error);
        return null;
      }
    },

    // Fetch the region dex and save it to the regionDex array
    async setRegionDex(regionDexUrl) {
      try {
        const response = await axios.get(regionDexUrl);
        const pokemonEntries = response.data.pokemon_entries;

        // Extract Pokemon names from the entries and add to the regionDex array
        const pokemonNames = pokemonEntries.map(entry => entry.pokemon_species.name);
        this.regionDex = pokemonNames;
      } catch (error) {
        console.error(`Error fetching region dex for ${regionDexUrl}:`, error);
      }
    },

    // Add Pokemon to the Pokedex
    addToPokedex(pokemonName) {
      if (!this.pokedex.includes(pokemonName)) {
        this.pokedex.push(pokemonName);
      }
    },

    // Clear the Pokedex
    clearPokedex() {
      this.pokedex = [];
    },

    // Log the current Pokemon list
    logPokedex() {
      console.log('Current Pokemon List:', this.pokedex);
    },
  },
});
