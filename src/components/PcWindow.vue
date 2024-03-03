<template>
  <div class="bg-pokemon-dark text-white p-8 rounded">
    <!-- Display the PlayerTeam.vue component -->
    <PlayerTeam />
  </div>
</template>

<script>
// Import the PlayerTeam.vue component
import PlayerTeam from '@/components/PlayerTeam.vue';

export default {
  components: {
    PlayerTeam,
  },
};
</script>
