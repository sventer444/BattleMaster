// battlewindow.vue

<template>
    <div class="battle-window p-4 text-white text-center overflow-hidden">
      <!-- Display the opponent's front sprite -->
    <div class="flex items-center justify-center mb-4 overflow-hidden">
      <img
        :src="opponentDetails.team[0].sprites.front_default"
        :alt="opponentDetails.team[0].name"
        class="w-32 h-32"
      />
    </div>

  
      <!-- Divider between opponent and player team -->
      <!-- <div class="divider my-4"></div> -->
  
      <!-- Display player team at the bottom -->
      <div class="player-team mt-4">
        <PlayerTeam />
      </div>
    </div>
  </template>
  
  <script>
  // Import the PlayerTeam.vue and PcBoxes.vue components
  import PlayerTeam from '@/components/PlayerTeam.vue';
  
  export default {
  props: {
    opponentDetails: {
      type: Object,
      required: true,
    },
  },
    components: {
      PlayerTeam,
    },
  };
  </script>
  
  <style scoped>
  /* Apply global Tailwind CSS styles */
  .battle-window {
    border-radius: 0.5rem;
    color: #ecf0f1;
    font-size: 1rem;
    line-height: 1.5;
    max-width: 100%;
  }
  
  .text-xl {
    font-size: 1.75rem; /* 28px */
  }
  
  .font-bold {
    font-weight: bold;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  
  .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .mt-4 {
    margin-top: 1rem;
  }
  
  /* Additional styling for the opponent and player teams */
  .opponent-team {
    /* Add any specific styling for the opponent team */
  }
  
  .player-team {
    /* Add any specific styling for the player team */
  }
  
  /* Divider styling */
  .divider {
    border-bottom: 2px solid #4a5568; /* Tailwind CSS gray-700 color */
  }
  </style>
  