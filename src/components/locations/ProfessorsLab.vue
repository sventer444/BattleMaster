<!-- ProfessorsLab.vue -->

<template>
  <div class="location-details bg-pokemon-dark p-8 text-white text-center max-w-full max-h-screen">
    <p v-if="!isActiveRun" class="text-lg mb-4">Welcome to the Professor's Lab! This is where Trainers begin their challenge.
    </p>
    
    <div v-if="(canSelectStarter.length > 0) && !isActiveRun">
      <p>Select a starter pokemon!</p>
      <br>
      <div class="flex items-center justify-center space-x-4">
        <img
        v-for="(pokemonDetails, index) in selectedPokemonDetails"
        :key="index"
        :src="pokemonDetails?.sprites?.front_default"
        :alt="pokemonDetails?.name"
        class="w-44 h-44 cursor-pointer"
        @click="selectStarter(index)"
        />
      </div>
    </div>
    <div v-if="rivalBattle">
      <p class="text-lg mb-4">Now that you have your first pokemon, let's start your first battle.
        I've simulated a rival for you to battle against.
      </p>
      <div v-if="rivalData">
        <BattleWindow :opponentDetails="rivalData"/>
      </div>
    </div>

  </div>
</template>

<script>
import BattleWindow from '@/components/BattleWindow.vue';
import { useGameInfoStore } from '@/store/gameInfo';
import { usePlayerInfoStore } from '@/store/playerInfo';

export default {
  data() {
    return {
      selectedPokemonDetails: Array(3).fill(null),
      starterOptionDetails: Array(3).fill(null),
      rivalBattle: false,
      rivalData: null,
    };
  },
  components: {
    BattleWindow
  },
  computed: {
    isPlayerTeamEmpty() {
      const playerStore = usePlayerInfoStore();
      return playerStore.getPlayerTeam.length === 0;
    },
    isActiveRun() {
      const playerStore = usePlayerInfoStore();
      return playerStore.isActiveRun;
    },
    canSelectStarter() {
      const gameStore = useGameInfoStore();
      const pokedex = gameStore.accessPokedex;
      const uncaughtStarters = [0, 3, 6]
      .filter((indexNumber, arrayIndex) => {
        const pokedexHasNoData = (typeof pokedex[indexNumber]) != 'object';
        if(!pokedexHasNoData){
          this.starterOptionDetails[arrayIndex] = pokedex[indexNumber];
        }
        return pokedexHasNoData;
      },this);
      return uncaughtStarters;
    },
  },
  methods: {
    selectStarter(starterIndex) {
      const playerStore = usePlayerInfoStore();

        const starterDetails = this.selectedPokemonDetails[starterIndex];
          // Add selected Pokémon to the player's team
          playerStore.addToPlayerTeam(starterDetails);
          
          // Add 'Route 1' to the player's location whitelist
          playerStore.addToLocationWhitelist('Route 1');
          const rivalStarter = useGameInfoStore().determineRivalStarter(starterDetails.types[0].name,
          this.starterOptionDetails);
          const rivalTeam = {
              team: {
                  "0": rivalStarter
              }
          };
          this.rivalData = rivalTeam;
          console.log('prof lab starter data', this.rivalData);

          playerStore.startRun();
          this.rivalBattle = true;
    },
  },
  async mounted() {
    const gameStore = useGameInfoStore();
    const regionDex = Object.keys(gameStore.getRegionDex);
    const selectionIndexes = this.canSelectStarter;

    for (let arrayIndex = 0; arrayIndex < selectionIndexes.length; arrayIndex++) {
      const index = selectionIndexes[arrayIndex];

      try {
        const pokemonDetails = await gameStore.getPokemonDetails(regionDex[index]);
        if (pokemonDetails) {
          this.selectedPokemonDetails[arrayIndex] = pokemonDetails;
          this.starterOptionDetails[arrayIndex] = pokemonDetails;
        } else {
          console.error(`Details not found for Pokemon ${index}`);
        }
      } catch (error) {
        console.error(`Error fetching details for Pokemon ${index}:`, error);
      }
    }

    // Filter out null array values
    this.selectedPokemonDetails = this.selectedPokemonDetails.filter((detail) => {
      return detail != null
    });
  },
};
</script>

<style scoped>
/* Apply global Tailwind CSS styles */
.location-details {
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
  max-width: 100%;
  max-height: calc(100vh - 76px); /* Adjust as needed based on the height of the navbar */
}

.text-3xl {
  font-size: 1.875rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.5;
  margin-bottom: 1rem;
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

.w-44,
.h-44 {
  width: 11rem;
  height: 11rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
