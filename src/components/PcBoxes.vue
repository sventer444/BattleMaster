<template>
    <div class="pc-boxes bg-pokemon-dark p-4 text-white text-center max-w-full max-h-full overflow-hidden">
      <!-- Display Pokémon icons in a 5x6 grid -->
      <div class="grid grid-cols-6 gap-2 bg-pokemon-dark-shaded p-5">
        <div
          v-for="(pokemonDetails, index) in pcDisplay"
          :key="index"
          :class="{ 'selected-slot': isSelected(index) }"
          @click="selectSlot(index)"
          class="w-20 h-20 p-2 border-2 border-black cursor-pointer"
        >
          <img
            v-if="!isEmptySlot(pokemonDetails)"
            :src="pokemonDetails.icon.front_default"
            :alt="pokemonDetails.name"
            class="w-full h-full"
          />
        </div>
      </div>
  
      <!-- Arrow to display the next 30 Pokémon -->
      <div v-if="hasNextPage" @click="displayNextPage" class="mt-4 text-pokemon-red cursor-pointer">
        Show Next 30 Pokémon
      </div>
    </div>
  </template>
  
  
  <script>
  import { usePlayerInfoStore } from '../store/playerInfo/index';
  
  export default {
    data() {
      return {
        itemsPerPage: 30,
        currentPage: 1,
        selectedSlots: [],
      };
    },
    computed: {
      pcDisplay() {
        const playerStore = usePlayerInfoStore();
        const playerPc = playerStore.getPlayerPc;
        const pcArray = Array(30).fill({}); // Adjusted to 5x6 grid
  
        Object.keys(playerPc).forEach((slot) => {
          const index = parseInt(slot, 10);
          if (!isNaN(index) && index >= 0 && index < 30) {
            pcArray[index] = playerPc[slot];
          }
        });
  
        return pcArray;
      },
      hasNextPage() {
        const totalSlots = Object.keys(usePlayerInfoStore().getPlayerPc).length;
        return this.currentPage * this.itemsPerPage < totalSlots;
      },
    },
    methods: {
      displayNextPage() {
        this.currentPage++;
      },
      isEmptySlot(pokemonDetails) {
        // Check if the slot is empty
        return !pokemonDetails || Object.keys(pokemonDetails).length === 0;
      },
      selectSlot(index) {
        // Toggle slot selection
        if (this.selectedSlots.length < 2) {
          this.selectedSlots.push(index);
        }
  
        // Log the selected Pokémon when two slots are selected
        if (this.selectedSlots.length === 2) {
          const selectedPokemon1 = this.pcDisplay[this.selectedSlots[0]];
          const selectedPokemon2 = this.pcDisplay[this.selectedSlots[1]];
          console.log('Selected Pokémon:', selectedPokemon1, selectedPokemon2);
  
          // Reset selected slots and borders
          this.selectedSlots = [];
        }
      },
      isSelected(index) {
        return this.selectedSlots.includes(index);
      },
    },
  };
  </script>
  
  <style scoped>
/* Apply global Tailwind CSS styles */
.pc-boxes {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  border-radius: 0.5rem;
  color: #ecf0f1;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 100%;
  height: calc(100vh - 120px); /* Adjust as needed based on the height of top and bottom navbars */
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

.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.gap-2 {
  gap: 0.5rem;
}

.p-2 {
  padding: 0.25rem;
}

.w-20,
.h-20 {
  width: 5rem;
  height: 5rem;
}

.cursor-pointer {
  cursor: pointer;
}

.selected-slot {
  border-color: #3498db; /* Blue border color for selected slots */
}
</style>