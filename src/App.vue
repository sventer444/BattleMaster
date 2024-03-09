<template>
  <div id="app" class="font-sans antialiased text-center text-gray-800 flex flex-col min-h-screen">
    <!-- Top Navbar Component -->
    <top-navbar :showTopNavbar="showTopNavbar" @toggle-menu="toggleMenu" @show-user-info="showUserInfo" />

    <!-- Body Content -->
    <div class="flex-grow flex flex-col items-center justify-center">
      <!-- Dynamic component based on the route -->
      <router-view></router-view>
    </div>

    <!-- Bottom Navbar Component -->
    <bottom-navbar :showBottomNavbar="showBottomNavbar" />
  </div>
</template>

<script>
import TopNavbar from './components/TopNavbar.vue';
import BottomNavbar from './components/BottomNavbar.vue';
import { useGameInfoStore } from '@/store/gameInfo';
import { usePlayerInfoStore } from './store/playerInfo';

export default {
  name: 'App',
  components: {
    TopNavbar,
    BottomNavbar,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    showTopNavbar() {
      // Check if the current route is not the login page
      return this.$route.path !== '/login';
    },
    showBottomNavbar() {
      // Check if the current route is not the login page
      return this.$route.path !== '/login';
    },
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
    showUserInfo() {
      // Handle the logic to show the UserInfo component
      // For example, you can navigate to the UserInfo route
      this.$router.push('/user-info');
    },
  },
  created() {
    // Fetch region names when the application starts
    const gameInfo = useGameInfoStore();
    const playerInfo = usePlayerInfoStore();
    playerInfo.getUnlockedRegions.map(regionNumber => { gameInfo.setRegion(regionNumber)});
  },
};
</script>
