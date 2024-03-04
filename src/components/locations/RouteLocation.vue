<!-- RouteLocation.vue -->

<template>
  <div class="flex flex-col h-full p-4 text-white">
    <!-- Route Heading -->
    <h2 class="text-3xl font-semibold mb-4 text-white">Route {{ routeNumber }}</h2>

    <!-- Encounter Information Section -->
    <div class="flex items-center justify-between mb-8">
      <div class="encounter-info text-white">
        <p class="text-lg font-semibold mb-2">Encounter Information:</p>
        <!-- Stubbed text for encounter information -->
        <p>Wild Pokemon Appeared!</p>
      </div>
      <div class="pokemon-sprite">
        <!-- Stubbed sprite or image for encountered Pokemon -->
        <!-- <img src="pokemon_sprite_url" alt="Encountered Pokemon Sprite"> -->
      </div>
    </div>

    <!-- Spacer Section -->
    <div class="my-8"></div>

    <!-- Player Team Information Section -->
    <div class="flex items-center justify-between">
      <div class="player-team-info text-white">
        <p class="text-lg font-semibold mb-2">Your Pokemon Team:</p>
        <!-- Display player's team Pokemon names dynamically -->
        <p v-for="(pokemon, index) in playerTeam" :key="index">
          {{ `Pokemon ${index + 1}: ${pokemon.name}` }}
        </p>
      </div>
      <div class="pokemon-sprites">
        <!-- Stubbed sprites or images for player's Pokemon team -->
        <!-- <img src="pokemon_sprite_url" alt="Pokemon 1 Sprite"> -->
        <!-- Add more images as needed -->
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayerInfoStore } from '@/store/playerInfo';

export default {
  props: {
    routeNumber: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Get player's team from the store
    playerTeam() {
      const playerStore = usePlayerInfoStore();
      return playerStore.getPlayerTeam;
    },
  },
};
</script>

<style scoped>
/* Apply global Tailwind CSS styles */
.text-3xl {
  font-size: 1.875rem; /* 30px */
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.h-full {
  height: 100%;
}

.p-4 {
  padding: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}

/* Style for Encounter Information Section */
.encounter-info {
  flex: 1; /* Take up available space */
}

.pokemon-sprite img {
  max-width: 100px; /* Adjust the max-width as needed */
  max-height: 100px; /* Adjust the max-height as needed */
}

/* Style for Player Team Information Section */
.player-team-info {
  flex: 1; /* Take up available space */
}

.pokemon-sprites img {
  max-width: 50px; /* Adjust the max-width as needed */
  max-height: 50px; /* Adjust the max-height as needed */
}
</style>
