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
          try {
            const regionResponse = await axios.get(region.url);
            const locationsPromises = regionResponse.data.locations.map(async (location) => {
              // Fetch additional details for each location
              try {
                const locationResponse = await axios.get(location.url);
                return {
                  name: location.name,
                  details: locationResponse.data, // Adjust this based on the actual structure of the data
                };
              } catch (error) {
                console.error(`Error fetching details for ${location.name}:`, error);
                return null;
              }
            });

            // Wait for all location details to be fetched
            const locations = (await Promise.all(locationsPromises)).filter(Boolean);

            const regionData = {
              name: region.name,
              locations,
            };

            return regionData;
          } catch (error) {
            console.error(`Error fetching details for ${region.name}:`, error);
            return null;
          }
        });

        // Wait for all region details to be fetched
        this.regions = (await Promise.all(regionPromises)).filter(Boolean);
      } catch (error) {
        console.error('Error fetching Pokémon region names:', error);
      }
    },
  },
});
