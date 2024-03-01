// src/store/pokedex.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokedexStore = defineStore({
  id: 'pokedex',

  state: () => ({
    pokedex: [], // Array to store Pokemon names in the Pokedex
  }),

  actions: {
    // Fetch details for a single Pokemon by ID
    async fetchPokemonDetailsById(pokemonId) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching details for Pokemon ID ${pokemonId}:`, error);
        return null;
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
    logPokemonList() {
      console.log('Current Pokemon List:', this.pokedex);
    },
  },

});
