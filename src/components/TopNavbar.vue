<template>
  <div v-if="showTopNavbar" class="fixed top-0 z-20 flex justify-between items-center p-6 bg-pokemon-red-shaded w-full">
    <div>
      <!-- Hamburger Menu Icon -->
      <i class="fas fa-bars text-2xl cursor-pointer" @click="toggleMenu"></i>
    </div>
    <div>
      <!-- Player Icon (Replace with your actual player icon) -->
      <i class="fas fa-user-circle text-2xl cursor-pointer" @click="showUserInfo"></i>
    </div>

    <!-- Sidebar Menu (Hidden by default) -->
    <div :class="{ 'hidden': !isMenuOpen }" class="bg-pokemon-red-shaded h-screen w-64 p-6 fixed top-0 left-0 overflow-y-auto z-50">
      <ul>
        <!-- Dynamically list the first three Pokémon regions from the Region store -->
        <li v-for="(region, index) in getRegions" :key="index" @click="navigateToRegion(region)" class="cursor-pointer flex items-center space-x-2 text-white">
          <i class="fas fa-map text-lg"></i>
          <span class="text-lg font-semibold">{{ region }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRegionStore } from '../store/region';

export default {
  props: {
    showTopNavbar: Boolean,
  },
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
    showUserInfo() {
      this.$emit('show-user-info');
    },
    navigateToRegion(region) {
      this.$router.push({ name: 'RegionMap', params: { regionName: region } });
      this.isMenuOpen = false; // Close the menu after selecting a tab
    },
  },
};
</script>
