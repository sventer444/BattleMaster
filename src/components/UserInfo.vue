<template>
  <div class="flex items-center justify-center h-screen bg-pokemon-dark">
    <div class="text-white text-center">
      <h1 v-if="isAuthenticated" class="text-3xl font-semibold mb-4">Hello, {{ username }}</h1>
      <p v-else class="text-lg">Please log in to view this page.</p>

      <!-- Display the rareCandy count with appropriate styling -->
      <p class="text-xl mt-4">Rare Candies: {{ rareCandy }}</p>
    </div>
  </div>
</template>

<script>
import { usePlayerInfoStore } from '../store/playerinfo';

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
  },
};
</script>
