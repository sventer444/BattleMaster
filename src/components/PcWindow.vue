<template>
<div v-if="!isActiveRun">
  
    <div class="bg-pokemon-dark text-white p-8 rounded max-h-full overflow-hidden flex flex-col items-center">
    <!-- Conditionally render content based on isActiveRun -->
      <p class="text-lg">Visit the Professor's Lab to start a challenge</p>
    </div>
  </div>
  <div v-else>
    <div class="bg-pokemon-dark text-white p-8 rounded max-h-full overflow-hidden flex flex-col items-center">
    
      <!-- Display the PlayerTeam.vue component at the top -->
      <!-- <h2 class="text-3xl font-semibold mt-2 mb-2">Current Party</h2> -->
      <PlayerTeam class="mb-4 mt-2" :isPcWindow="true"/>

      <!-- Display the PcBoxes component with adjusted spacing -->
      <PcBoxes class="mt-4 mb-4" />
    </div>
  </div>
</template>

<script>
// Import the PlayerTeam.vue and PcBoxes.vue components
import PlayerTeam from '@/components/PlayerTeam.vue';
import PcBoxes from '@/components/PcBoxes.vue';
import { usePlayerInfoStore } from '@/store/playerInfo';

export default {
  components: {
    PlayerTeam,
    PcBoxes,
  },
  computed: {
    isActiveRun() {
      const playerInfoStore = usePlayerInfoStore();
      return playerInfoStore.isActiveRun;
    },
  },
};
</script>


<style scoped>
/* Apply global Tailwind CSS styles */
.mb-4 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

/* Add margin at the bottom of PcBoxes */
.mb-4 {
  margin-bottom: 1rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

/* Set maximum height to fit available space */
.max-h-full {
  max-height: calc(100vh - 120px); /* Adjust as needed based on the height of top and bottom navbars */
}
</style>
