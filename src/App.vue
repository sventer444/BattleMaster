<!-- src/App.vue -->
<template>
  <div id="app" class="font-sans antialiased text-center text-gray-800 flex flex-col min-h-screen">
    <!-- Top Game Bar -->
    <div class="flex justify-between items-center p-6 bg-pokemon-red-shaded">
      <div>
        <!-- Hamburger Menu Icon -->
        <i class="fas fa-bars text-2xl cursor-pointer" @click="toggleMenu"></i>
      </div>
      <div>
        <!-- Player Icon (Replace with your actual player icon) -->
        <i class="fas fa-user-circle text-2xl"></i>
      </div>
    </div>

    <!-- Body Content -->
    <div class="flex-grow flex items-center justify-center">
      <!-- Dynamic component based on the route -->
      <router-view></router-view>
    </div>

    <!-- Navigation Bar -->
    <div class="flex justify-around p-6 bg-pokemon-red-shaded">
      <div>
        <!-- Computer Icon (Replace with your actual computer icon) -->
        <i class="fas fa-desktop text-2xl"></i>
      </div>
    </div>

    <!-- Sidebar Menu (Hidden by default) -->
    <div :class="{ 'hidden': !isMenuOpen }" class="bg-pokemon-red-shaded h-screen w-64 p-6 fixed top-0 left-0 overflow-y-auto">
      <ul>
        <li @click="navigateToRegion('Kanto')" class="cursor-pointer flex items-center space-x-2">
          <i class="fas fa-map text-lg"></i>
          <span>Kanto</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    navigateToRegion(region) {
      // Handle navigation based on the selected region
      console.log(`Navigating to ${region}`);
      this.isMenuOpen = false; // Close the menu after selecting a tab
    },
  },
};
</script>
