<!-- src/components/PcWindow.vue -->

<template>
  <div class="bg-pokemon-dark-shaded text-white p-8 rounded shadow-md">
    <h1 class="text-4xl mb-4">Welcome to the Pokémon World!</h1>
    <p class="text-lg">Explore the regions and catch 'em all!</p>
    <p class="text-lg mt-4">Pokédex Count: {{ pokedexCount }}</p>
  </div>
</template>

<script>
import { usePokedexStore } from '../store/pokedex';

export default {
  computed: {
    pokedexCount() {
      return usePokedexStore().accessPokedex.length;
    },
  },
};
</script>
