<template>
  <div class="battle-window p-2 text-white text-center flex flex-col justify-between">
    <!-- Container for opponent's information -->
    <div class="flex flex-col items-center" v-if="displayedOpponent">
      <!-- Health styled above the Pokemon sprite -->
      <div class="flex items-center justify-center mb-1">
        <div class="bg-green-500 rounded-full px-9 py-1 text-xs font-bold">{{ displayedOpponent.currentHp }}</div>
      </div>
      <!-- Pokemon sprite -->
      <img
        :src="displayedOpponent.sprites.front_default"
        :alt="displayedOpponent.name"
        class="w-32 h-32"
      />
    </div>

    <!-- Spacer to push player team to the bottom -->
    <div class="flex-grow"></div>

    <!-- Display player team at the bottom -->
    <div class="player-team mt-2">
      <PlayerTeam />
    </div>

    <!-- Buttons for Physical and Special -->
    <div class="flex items-center justify-center space-x-5 mt-4">
      <button @click="handleAttack('physical')" class="bg-orange-500 text-white px-4 py-2 rounded-full">Physical</button>
      <button @click="handleAttack('special')" class="bg-purple-500 text-white px-4 py-2 rounded-full">Special</button>
    </div>
  </div>
</template>

<script>
import PlayerTeam from '@/components/PlayerTeam.vue';
import { usePlayerInfoStore } from '@/store/playerInfo';

export default {
  props: {
    opponentDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    displayedOpponent() {
      // Find the next healthy opponent Pokemon
      const nextHealthyPokemon = usePlayerInfoStore().getFirstHealthyFromTeam(Object.values(this.opponentDetails.team))
      // If no healthy Pokemon found, end the battle
      if (!nextHealthyPokemon) {
        usePlayerInfoStore().endBattle("win");
        // this.$router.back();
      }
      return nextHealthyPokemon;
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleAttack(damageType) {
      //TODO determine attack order
      const playerStore = usePlayerInfoStore();
      playerStore.caclulateAndApplyOpponentDamage(this.displayedOpponent);
      playerStore.calculateAndApplyTeamDamage(damageType, this.displayedOpponent);
      const playerTeam = playerStore.getPlayerTeam;
      const nextHealthyPokemon = playerStore.getFirstHealthyFromTeam(Object.values(playerTeam));
      if (!nextHealthyPokemon) {
        playerStore.endBattle();
        this.$router.back();
      }
    },
  },
  components: {
    PlayerTeam,
  },
};
</script>

<style scoped>
/* Apply global Tailwind CSS styles */
.battle-window {
  border-radius: 0.5rem;
  color: #ecf0f1;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 100%;
  height: calc(80vh - 60px); /* Adjust based on the height of your navbars */
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.text-xl {
  font-size: 1.75rem;
}

.font-bold {
  font-weight: bold;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

/* Adjust the size of the opponent sprite */
.w-32,
.h-32 {
  width: 8rem;
  height: 8rem;
}
</style>
