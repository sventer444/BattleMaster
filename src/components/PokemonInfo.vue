<template>
  <div class="pokemon-info p-4 text-white text-center relative">
    <!-- Close button -->
    <button @click="$emit('close')" class="absolute top-0 right-0 m-4 text-gray-300 hover:text-white focus:outline-none">
      <i class="fas fa-times"></i>
    </button>

    <!-- Display Pokémon front sprite -->
    <div class="flex items-center justify-center mb-4">
      <img
        v-if="pokemonDetails"
        :src="pokemonDetails.sprites.front_default"
        :alt="pokemonDetails.name"
        class="w-32 h-32"
      />
    </div>

    <!-- Display Pokémon information -->
    <div v-if="pokemonDetails">
      <h2 class="text-2xl font-bold mb-2">{{ capitalizeFirstLetter(pokemonDetails.name) }}</h2>
      <div class="mb-2">
        <span class="font-bold">Type:</span> {{ getFormattedTypes(pokemonDetails.types) }}
      </div>
      <div class="mb-2">
        <span class="font-bold">Level:</span> {{ pokemonDetails.level }}
      </div>

      <!-- Display Pokémon stats -->
      <div class="flex justify-center mb-4">
        <div v-for="(value, stat) in pokemonDetails.stats" :key="stat" class="flex flex-col items-center mx-4">
          <span class="text-xs uppercase font-bold">{{ displayStatName(stat) }}</span>
          <div class="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center mt-2">
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemonDetails: {
      type: Object,
      required: true,
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getFormattedTypes(types) {
      return types.map(type => this.capitalizeFirstLetter(type.type.name)).join(', ');
    },
    displayStatName(statName) {
      switch (statName) {
        case 'hp': return 'HP';
        case 'attack': return 'Attack';
        case 'specialAttack': return 'Special Attack';
        case 'specialDefense': return 'Special Defense';
        case 'defense': return 'Defense';
        case 'speed': return 'Speed';
        // Add other cases as needed
        default: return statName; // Handle any other cases
      }
    },
  },
};
</script>

<style scoped>
/* Apply global Tailwind CSS styles */
.pokemon-info {
  border-radius: 0.5rem;
  color: #ecf0f1;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 100%;
  position: relative;
}

.text-2xl {
  font-size: 1.5rem; /* 24px */
}

.w-32,
.h-32 {
  width: 8rem;
  height: 8rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.font-bold {
  font-weight: bold;
}

/* Custom styles for stats display */
.text-xs {
  font-size: 0.75rem; /* 12px */
}

.bg-gray-700 {
  background-color: #4a5568; /* Tailwind CSS gray-700 color */
}

.rounded-full {
  border-radius: 9999px;
}
</style>
