<template>
    <div class="flex items-center justify-center bg-pokemon-dark">
      <div class="map-container-wrapper w-full flex items-center justify-center">
        <div class="map-container bg-gray-800 p-8 rounded-lg shadow-lg text-white text-center max-w-full max-h-screen overflow-y-auto">
          <h1 class="text-3xl font-semibold mb-4">{{ capitalizedRegionName }}</h1>
          <p class="text-lg mb-4">Select a location</p>
  
          <!-- Display locations in three columns -->
          <div class="flex justify-center mt-4">
            <div v-for="(column, columnIndex) of columns" :key="columnIndex" class="mx-8">
              <ul>
                <!-- Add left and right margin to each list item -->
                <li v-for="(location, index) in column" :key="index" class="text-lg py-3 mx-12">
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
  
  export default {
    props: {
      regionName: {
        type: String,
        required: true,
      },
    },
    computed: {
      // Calculate columns based on the locations in the region
      columns() {
        const regionData = this.getRegionData();
        const locations = regionData ? regionData.locations : [];
  
        // Split locations into three columns
        const columnSize = Math.ceil(locations.length / 3);
        const columns = [];
  
        for (let i = 0; i < 3; i++) {
          const start = i * columnSize;
          const end = start + columnSize;
          columns.push(locations.slice(start, end));
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
      // Get the display name for a location
      getDisplayName(location) {
        const enName = location.details.names.find(name => name.language.name === 'en');
        return enName ? enName.name : location.name;
      },
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
  .bg-gray-800 {
    background-color: #2c3e50; /* Dark gray background */
  }
  
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
  