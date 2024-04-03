<template>
  <div class="player-team bg-pokemon-dark p-8 text-white text-center">
    <!-- PcWindow Team View -->
    <div v-if="isPcWindow" class="pc-style flex items-center justify-center flex-wrap space-x-4">
      <div
        v-for="(pokemonDetails, slot) in displayedTeam"
        :key="slot"
        :class="{ 'selected-slot': isSelected(slot) }"
        @click="selectSlot(slot)"
        :style="{ borderColor: '#000' }"
        class="w-32 h-32 p-2 border-2 mb-2 cursor-pointer"
      >
        <img
          v-if="pokemonDetails"
          :src="pokemonDetails?.icon.front_default"
          :alt="pokemonDetails?.name"
          class="w-full h-full"
        />
      </div>
    </div>

   <!-- Battle Team View -->
  <div v-else class="flex items-center justify-center flex-wrap space-x-4 battle-style">
    <div
      v-for="(pokemonDetails, slot) in displayedTeam.filter(Boolean)"
      :key="slot"
      :class="{ 'selected-slot': isSelected(slot) }"
      @click="selectSlot(slot)"
      :style="{ borderColor: '#212121' }"
      class="w-32 h-32 p-2 border-2 mb-4 cursor-pointer"
    >
      <!-- Health styled above the Pokemon sprite -->
      <div class="flex items-center justify-center mb-2">
        <div class="bg-green-500 rounded-full px-9 py-1 text-xs font-bold">{{ pokemonDetails.currentHp }}</div>
      </div>
      <!-- Capitalized name and level below the health -->
      <div class="text-lg font-bold">
        {{ capitalizeFirstLetter(pokemonDetails.name) }}
      </div>
      <div class="text-lg font-bold">
        Lv. {{ pokemonDetails.level }}
      </div>
      <!-- Pokemon sprite -->
      <img
        :src="pokemonDetails.sprites.back_default"
        :alt="pokemonDetails.name"
        class="size-32"
      />
      <div v-if="this.displayedDamage[slot] != null" class="text-lg font-bold">
        {{ (this.displayedDamage[slot].damage * this.displayedDamage[slot].efficacy) }}
      </div>
    </div>
  </div>


  </div>
</template>

<script>
import { usePlayerInfoStore } from '../store/playerInfo/index';

export default {
  props: {
    isPcWindow: {
      type: Boolean,
      default: false,
    },
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
    displayedDamage() {
      const attackDamage = usePlayerInfoStore().getAttackDamage;
      const displayDamage = Array(6).fill(null);
      // Convert object to array for rendering in the template
      Object.keys(attackDamage).forEach((slot) => {
        const index = parseInt(slot);
        if (index >= 0 && index < 6) {
          displayDamage[index] = attackDamage[slot];
        }
      });
      return displayDamage;
    },
    selectedSlots() {
      return this.initializeSelectedSlots();
    },
  },
  methods: {
    initializeSelectedSlots() {
      const playerStore = usePlayerInfoStore();
      const selectedPokemon1 = playerStore.getSelectedPokemon1;
      const selectedPokemon2 = playerStore.getSelectedPokemon2;

      const selectedSlots = [];

      if (selectedPokemon1 !== null && selectedPokemon1.type == "Team") {
        selectedSlots.push(selectedPokemon1.slot);
      }

      if (selectedPokemon2 !== null && selectedPokemon2.type == "Team") {
        selectedSlots.push(selectedPokemon2.slot);
      }

      return selectedSlots;
    },
    selectSlot(index) {
      // Toggle slot selection
      this.selectedSlots.push(index);
      var selectMon = this.displayedTeam[index];
      if (selectMon == null) selectMon = 'Empty Team Slot';
      usePlayerInfoStore().setSelectedPokemon(selectMon, index, 'Team');

    },
    isSelected(index) {
      return this.selectedSlots.includes(index);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
  color: #ecf0f1;
  font-size: 1.125rem;
  line-height: 1.5;
  padding-left: 2rem;
  padding-right: 2rem;
}

.battle-style {
  margin-bottom: 10vh;
}

.pc-style {
  margin-top: 20vh;
}

.text-3xl {
  font-size: 1.875rem;
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

.p-2 {
  padding: 0.5rem;
}

.cursor-pointer {
  cursor: pointer;
}

.selected-slot {
  border-color: #3498db !important;
}

body {
  overflow: hidden;
}


</style>
