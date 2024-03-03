<template>
  <div class="bg-pokemon-dark text-white p-8 rounded max-h-full overflow-hidden flex flex-col items-center">
    <!-- Display the PlayerTeam.vue component at the top -->
    <PlayerTeam class="mb-4 mt-2" />

    <!-- Display the PcBoxes component with adjusted spacing -->
    <PcBoxes class="mt-4 mb-4" />
  </div>
</template>

<script>
// Import the PlayerTeam.vue and PcBoxes.vue components
import PlayerTeam from '@/components/PlayerTeam.vue';
import PcBoxes from '@/components/PcBoxes.vue';

export default {
  components: {
    PlayerTeam,
    PcBoxes,
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

/* Prevent overflow on inner components */
.overflow-hidden > * {
  overflow: hidden;
}
</style>
