<template>
  <div class="flex items-center justify-center h-screen bg-pokemon-dark">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg text-white text-center max-w-md">
      <h1 v-if="isAuthenticated" class="text-3xl font-semibold mb-4">Trainer Card</h1>
      <p v-else class="text-lg">Please log in to view this page.</p>

      <!-- Trainer's Name -->
      <p v-if="isAuthenticated" class="text-2xl font-semibold">{{ username }}</p>

      <!-- Badge Progress -->
      <div v-if="isAuthenticated" class="flex items-center justify-center mt-4">
        <div v-for="(badge, index) in badgeProgress" :key="index" :class="{ 'badge-icon': true, 'filled': badge, 'gym-badge': true }"></div>
      </div>

      <!-- Pokedex Count -->
      <p v-if="isAuthenticated" class="text-xl mt-4">Pokédex Count: {{ pokedexCount }}</p>

      <!-- Display the Rare Candy count with appropriate styling -->
      <p v-if="isAuthenticated" class="text-xl mt-4">Rare Candies: {{ rareCandy }}</p>
    </div>
  </div>
</template>

<script>
import { usePlayerInfoStore } from '../store/playerinfo';
import { usePokedexStore } from '../store/pokedex';

export default {
  computed: {
    isAuthenticated() {
      return usePlayerInfoStore().isAuthenticated;
    },
    username() {
      return usePlayerInfoStore().username;
    },
    rareCandy() {
      return usePlayerInfoStore().rareCandy;
    },
    badgeProgress() {
      return usePlayerInfoStore().badgeCase;
    },
    pokedexCount() {
      return usePokedexStore().accessPokedex.length;
    },
  },
};
</script>