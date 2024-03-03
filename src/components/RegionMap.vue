<!-- RegionMap.vue -->

<template>
  <div class="flex items-center justify-center bg-pokemon-dark">
    <div class="map-container-wrapper w-full flex items-center justify-center">
      <div class="map-container bg-pokemon-dark-shaded p-8 rounded-lg shadow-lg text-white text-center max-w-full max-h-screen overflow-y-auto">
        <h1 class="text-3xl font-semibold mb-4">{{ capitalizedRegionName }}</h1>
        <p class="text-lg mb-4">Select a location</p>

        <!-- Display locations in three columns -->
        <div class="flex justify-center mt-4">
          <div v-for="(column, columnIndex) of columns" :key="columnIndex" class="mx-8">
            <ul>
              <!-- Add left and right margin to each list item -->
              <li v-for="(location, index) in column" :key="index" @click="navigateToLocation(location)" class="text-lg py-2 mx-12 cursor-pointer">
                {{ getDisplayName(location) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRegionStore } from '../store/region';
import { usePlayerInfoStore } from '../store/playerinfo';
import { usePokedexStore } from '../store/pokedex';

export default {
  props: {
    regionName: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Update the columns computed property to filter locations based on the whitelist
    columns() {
      const regionData = this.getRegionData();
      const locations = regionData ? regionData.locations : [];

      // Separate route locations based on name containing "Route"
      const routeLocations = locations.filter(location => this.locationContainsRoute(location));

      // Filter the route locations based on the whitelist
      const filteredRoutes = routeLocations.filter(route => this.isLocationInWhitelist(route));

      // Filter locations based on the whitelist
      const filteredLocations = locations.filter(location => this.isLocationInWhitelist(location));

      // Remove route locations from filteredLocations
      const filteredLocationsWithoutRoutes = filteredLocations.filter(location => !this.locationContainsRoute(location));

      // Split filtered locations into two columns
      const columnSize = Math.ceil(filteredLocationsWithoutRoutes.length / 2);
      const columns = [];

      for (let i = 0; i < 2; i++) {
        const start = i * columnSize;
        const end = start + columnSize;
        columns.push(filteredLocationsWithoutRoutes.slice(start, end));
      }

      // Add a third column for route locations if they exist
      if (filteredRoutes.length > 0) {
        columns.push(filteredRoutes);
      }

      return columns;
    },
    // Capitalize the first letter of the region name
    capitalizedRegionName() {
      return this.regionName.charAt(0).toUpperCase() + this.regionName.slice(1);
    },
  },
  methods: {
    // Get region data from the region store based on regionName
    getRegionData() {
      const regions = useRegionStore().getRegions;
      return regions.find(region => region.name === this.regionName);
    },
    // Method to navigate to a location when it's clicked
    navigateToLocation(location) {
      // Use the $router.push method to navigate to the location's route
      (this.locationContainsRoute(location)) ? 
      this.navigateToRoute(location)
      : this.$router.push({ name: location.name });
      
    },
    
    navigateToRoute(route) {
      // Parse the route number from the route name
      const routeNumber = this.parseRouteNumber(route.name);

      // Use the $router.push method to navigate to the route's name with route number as param
      this.$router.push({ name: 'Route', params: { routeNumber: routeNumber } });
    },
    // Get the display name for a location
    getDisplayName(location) {
      const enName = location.details?.names?.find(name => name.language.name === 'en');
      return enName ? enName.name : location.name;
    },
    parseRouteNumber(routeName) {
      // Assuming the route name is in the format "Route <number>"
      const matches = routeName.match(/\d+/);
      return matches ? parseInt(matches[0]) : null;
    },
    // Check if a location name contains the string "Route"
    locationContainsRoute(location) {
      return location.name.toLowerCase().includes('route');
    },
    // Check if a location is in the player's whitelist
    isLocationInWhitelist(location) {
      const playerStore = usePlayerInfoStore();
      return playerStore.locationsWhitelist.includes(this.getDisplayName(location));
    },
  },
  mounted() {
    // Fetch the region dex URL from the region store
    const regionData = this.getRegionData();
    const regionDexUrl = regionData ? regionData.regionDexUrl : null;

    // Call the setRegionDex method from the pokedex store with the region dex URL
    if (regionDexUrl) {
      usePokedexStore().setRegionDex(regionDexUrl);
    }
  },
};
</script>

<style scoped>
/* Apply global Tailwind CSS styles */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

/* Additional styling for improved consistency with UserInfo component */

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-white {
  color: #ecf0f1; /* White text color */
}

.text-3xl {
  font-size: 1.875rem; /* 30px */
}

.text-lg {
  font-size: 1.125rem; /* 18px */
  line-height: 1.5;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}

/* Additional styling for the list */
ul {
  list-style-type: none;
  padding: 0;
}

/* Set a maximum height for the container */
.max-h-screen {
  max-height: calc(100vh - 120px); /* Adjust as needed based on the height of top and bottom navbars */
}

/* Additional styling for the map container wrapper */
.map-container-wrapper {
  width: 100%; /* Take up the full width of its parent */
}

/* Enable vertical scrolling when needed */
.overflow-y-auto {
  overflow-y: auto;
}
</style>
