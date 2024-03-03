<template>
    <div>
      <!-- Hamburger Menu Icon -->
      <i class="fas fa-bars text-2xl cursor-pointer" @click="toggleMenu"></i>
  
      <!-- Sidebar Menu (Hidden by default) -->
      <div :class="{ 'hidden': !isMenuOpen }" class="bg-pokemon-dark-shaded h-full w-64 p-6 fixed top-20 left-0 overflow-y-auto z-50">
        <ul>
          <!-- Dynamically list the first three Pokémon regions from the Region store -->
          <li v-for="(region, index) in getRegions" :key="index" @click="navigateToRegion(region)" class="cursor-pointer flex items-center space-x-2 text-white mb-4">
            <i class="fas fa-map text-lg"></i>
            <span class="text-lg font-semibold">{{ capitalizeFirstLetter(region) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { useRegionStore } from '../store/region';
  
  export default {
    data() {
      return {
        isMenuOpen: false,
      };
    },
    computed: {
      getRegions() {
        // Retrieve the first Pokémon regions from the Region store and trim the list
        return useRegionStore().getRegions.slice(0, 1).map(region => region.name);
      },
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      navigateToRegion(region) {
        this.$router.push({ name: 'RegionMap', params: { regionName: region } });
        this.isMenuOpen = false; // Close the menu after selecting a tab
      },
      capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
    },
  };
  </script>
  