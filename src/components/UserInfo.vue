<template>
  <div class="flex items-center justify-center h-screen bg-pokemon-dark">
    <div class="bg-pokemon-dark-shaded p-8 rounded-lg shadow-lg text-white text-center max-w-md">
      <h1 class="text-3xl font-semibold mb-4">Trainer Card</h1>

      <!-- Trainer's Name -->
      <p class="text-2xl font-semibold">{{ username }}</p>

      <!-- Pokedex Count -->
      <p class="text-xl mt-4">Pokédex Count: {{ pokedexCount }}</p>

    </div>
  </div>
</template>

<script>
import { usePlayerInfoStore } from '@/store/playerInfo';
import { useGameInfoStore } from '@/store/gameInfo';

export default {
  computed: {
    username() {
      return usePlayerInfoStore().username;
    },
    pokedexCount() {
      return useGameInfoStore().accessPokedex.length;
    },
  },
};
</script>
