<template>
    <div class="player-team bg-pokemon-dark p-8 text-white text-center max-w-full max-h-screen overflow-y-auto">
      <!-- Display Pokémon team names in 1 row, 6 column maximum format -->
    <div class="flex items-center justify-center space-x-4">
      <img
        v-for="(pokemonDetails, index) in playerTeam"
        :key="index"
        :src="pokemonDetails.icon.front_default"
        :alt="pokemonDetails?.name"
        class="w-36 h-36"
      />
    </div>
  
    </div>
  </template>
  
  <script>
  import { usePlayerInfoStore } from '../store/playerinfo';
  
  export default {
    computed: {
      playerTeam() {
        const playerStore = usePlayerInfoStore();
        return playerStore.getPlayerTeam;
      },
    },
    methods: {
    },
  };
  </script>
  
  <style scoped>
  /* Apply global Tailwind CSS styles */
  .player-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    color: #ecf0f1; /* White text color */
    font-size: 1.125rem; /* 18px */
    line-height: 1.5;
    padding-left: 2rem;
    padding-right: 2rem;
    max-width: 100%;
    max-height: calc(100vh - 120px); /* Adjust as needed based on the height of top and bottom navbars */
    overflow-y: auto;
  }
  
  .text-3xl {
    font-size: 1.875rem; /* 30px */
  }
  
  .text-lg {
    font-size: 1.125rem; /* 18px */
    line-height: 1.5;
    margin-bottom: 1rem;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  .flex {
    display: flex;
  }
  
  .items-center {
    align-items: center;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .space-x-4 > * + * {
    margin-left: 1rem;
  }
  </style>
  