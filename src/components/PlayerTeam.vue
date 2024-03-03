<template>
  <div class="player-team bg-pokemon-dark p-8 text-white text-center max-w-full max-h-screen overflow-y-auto">
    <h2 class="text-3xl font-semibold mb-2">Current Team</h2>
    <!-- Display Pokémon team names in 1 row, 6 column maximum format -->
    <div class="flex items-center justify-center flex-wrap space-x-4">
      <div
        v-for="(pokemonDetails, slot) in displayedTeam"
        :key="slot"
        class="w-36 h-36 p-2 border-2 mb-4"
      >
        <img
          v-if="pokemonDetails"
          :src="pokemonDetails.icon.front_default"
          :alt="pokemonDetails?.name"
          class="w-full h-full"
        />
      </div>
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
    displayedTeam() {
      const teamObject = this.playerTeam;
      const teamArray = Array(6).fill(null);

      // Convert object to array for rendering in the template
      Object.keys(teamObject).forEach((slot) => {
        const index = parseInt(slot);
        if (index >= 0 && index < 6) {
          teamArray[index] = teamObject[slot];
        }
      });

      return teamArray;
    },
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

/* Adjust the border styling for the player team slots */
.w-36,
.h-36 {
  width: 9rem;
  height: 9rem;
  border: 2px solid #000; /* Black border */
}

.p-2 {
  padding: 0.5rem;
}
</style>
