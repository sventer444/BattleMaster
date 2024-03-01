// src/store/region.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useRegionStore = defineStore({
  id: 'region',

  state: () => ({
    currentRegion: '', // Current Region
    regions: [], // Array to store Pokémon region names
  }),

  getters: {
    getRegions() {
      return this.regions;
    },
  },

  actions: {
    async fetchRegions() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/region');
        const regionPromises = response.data.results.map(async (region) => {
          // Fetch additional details for each region, including locations
          const regionResponse = await axios.get(region.url);
          const regionData = {
            name: region.name,
            locations: regionResponse.data.locations,
          };
          return regionData;
        });

        // Wait for all region details to be fetched
        this.regions = await Promise.all(regionPromises);
      } catch (error) {
        console.error('Error fetching Pokémon region names:', error);
      }
    },
  },
});
