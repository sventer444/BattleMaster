<!-- ProfessorsLab.vue -->

<template>
  <div class="location-details bg-pokemon-dark p-8 text-white text-center max-w-full max-h-screen overflow-y-auto">
    <p v-if="isPlayerTeamEmpty" class="text-lg mb-4">Welcome to the Professor's Lab! This is where Trainers begin their Pokémon journey.</p>
    <p v-else class="text-lg mb-4">Take your pokemon out and explore the region.
      Try to earn as many Gym Badges as you can!</p>
    

    <!-- Conditionally display sprites only when the player's team is empty -->
    <div v-if="isPlayerTeamEmpty" class="flex items-center justify-center space-x-4">
      <img
        v-for="(pokemonDetails, index) in selectedPokemonDetails"
        :key="index"
        :src="pokemonDetails?.sprites?.front_default"
        :alt="pokemonDetails?.name"
        class="w-44 h-44 cursor-pointer"
        @click="selectStarter(pokemonDetails?.name)"
      />
      <p class="text-lg mt-4">Select your starter Pokémon!</p>
    </div>
  </div>
</template>

<script>
import { useGameInfoStore } from '@/store/gameInfo';
import { usePlayerInfoStore } from '@/store/playerInfo';

export default {
  data() {
    return {
      selectedPokemonIndices: [0, 3, 6],
      selectedPokemonDetails: Array(3).fill(null),
    };
  },
  computed: {
    isPlayerTeamEmpty() {
      const playerStore = usePlayerInfoStore();
      return playerStore.getPlayerTeam.length === 0;
    },
  },
  methods: {
    async selectStarter(starterName) {
      const gameStore = useGameInfoStore();
      const playerStore = usePlayerInfoStore();
      const regionDex = gameStore.getRegionDex;

      try {
        const pokemonDetails = regionDex[starterName];

        if (pokemonDetails) {
          // Add selected Pokémon to the player's team
          playerStore.addToPlayerTeam(pokemonDetails);

          // Add 'Route 1' to the player's location whitelist
          playerStore.addToLocationWhitelist('Route 1');

          // Navigate back to the previous route
          this.$router.back();
        } else {
          console.error(`Details not found for Pokemon ${starterName}`);
        }
      } catch (error) {
        console.error(`Error fetching details for Pokemon ${starterName}:`, error);
      }
    },
  },
  async mounted() {
    const gameStore = useGameInfoStore();
    const regionDex = Object.keys(gameStore.getRegionDex);

    for (let arrayIndex = 0; arrayIndex < this.selectedPokemonIndices.length; arrayIndex++) {
      const index = this.selectedPokemonIndices[arrayIndex];

      try {
        const pokemonDetails = await gameStore.getPokemonDetails(regionDex[index]);
        // console.log(pokemonDetails)
        if (pokemonDetails) {
          this.selectedPokemonDetails[arrayIndex] = pokemonDetails;
        } else {
          console.error(`Details not found for Pokemon ${index}`);
        }
      } catch (error) {
        console.error(`Error fetching details for Pokemon ${index}:`, error);
      }
    }
  },
};
</script>

<style scoped>
/* Apply global Tailwind CSS styles */
/* ... (existing styles) */
</style>


<style scoped>
/* Apply global Tailwind CSS styles */
.location-details {
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
