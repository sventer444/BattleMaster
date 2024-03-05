<template>
  <div class="player-team bg-pokemon-dark p-8 text-white text-center max-w-full">
    <h2 class="text-3xl font-semibold mb-2">Current Party</h2>
    <!-- Display Pokémon team names in 1 row, 6 column maximum format -->
    <div class="flex items-center justify-center flex-wrap space-x-4">
      <div
        v-for="(pokemonDetails, slot) in displayedTeam"
        :key="slot"
        :class="{ 'selected-slot': isSelected(slot) }"
        @click="selectSlot(slot)"
        class="w-36 h-36 p-2 border-2 mb-4 cursor-pointer"
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
import { usePlayerInfoStore } from '../store/playerInfo/index';

export default {
  data() {
    return {
      selectedSlots: this.initializeSelectedSlots(),
    };
  },
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
  methods: {
    initializeSelectedSlots() {
      const playerStore = usePlayerInfoStore();
      const selectedPokemon1 = playerStore.getSelectedPokemon1;
      const selectedPokemon2 = playerStore.getSelectedPokemon2;
      
      const selectedSlots = [];

      if (selectedPokemon1 !== null) {
        selectedSlots.push(selectedPokemon1.slot);
      }

      if (selectedPokemon2 !== null) {
        selectedSlots.push(selectedPokemon2.slot);
      }

      return selectedSlots;
    },
    selectSlot(index) {
        // Toggle slot selection
          this.selectedSlots.push(index);
          var selectMon = this.displayedTeam[index];
          if(selectMon == null) selectMon = 'Empty Team Slot'
          usePlayerInfoStore().setSelectedPokemon(selectMon, index);

        if (this.selectedSlots.length === 2) {
          this.selectedSlots = [];
          this.initializeSelectedSlots();
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
  margin-top: calc(50vh - 120px); /* Adjust as needed based on the height of top and bottom navbars */
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

.cursor-pointer {
  cursor: pointer;
}

.selected-slot {
  border-color: #3498db !important; /* Blue border color for selected slots */
}

body {
  overflow: hidden; /* Disable scrolling for the entire page */
}
</style>
