<template>
  <div class="pokedex-container bg-pokemon-dark p-4 text-white text-center max-w-full overflow-hidden">
    <!-- Display Pokémon icons in a 5x12 grid -->
    <div class="grid grid-cols-12 gap-2 bg-pokemon-dark-shaded p-5" style="max-height: 700px; overflow-y: auto;">
      <div
        v-for="(pokemonDetails, index) in pcDisplay"
        :key="index"
        class="w-10 h-10 p-2 border-2 border-black cursor-pointer"
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
import { usePokedexStore } from '@/store/pokedex';

export default {
  computed: {
    pcDisplay() {
      const pokedexStore = usePokedexStore();
      const playerDex = pokedexStore.accessPokedex;
      const numSlots = 151;
      const dexArray = Array(numSlots).fill(null); // Adjusted to 12 column grid

      Object.keys(playerDex).forEach((slot) => {
        const index = parseInt(slot);
        if (index >= 0 && index < numSlots) {
          dexArray[index] = playerDex[slot];
        }
      });

      return dexArray;
    },
  },
};
</script>

<style scoped>
/* Apply global Tailwind CSS styles */
.pokedex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  border-radius: 0.5rem;
  color: #ecf0f1;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 100%;
  overflow-y: auto;
  margin-bottom: 0;
  flex-grow: 2;
}

.text-2xl {
  font-size: 1.5rem; /* 24px */
}

.grid {
  display: grid;
}

.grid-cols-12 {
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.gap-2 {
  gap: 0.5rem;
}

.p-2 {
  padding: 0.25rem;
}

.w-10,
.h-10 {
  width: 2.5rem;
  height: 2.5rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
