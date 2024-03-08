<template>
    <div class="pokemon-info p-4 text-white text-center relative">
      <!-- Close button -->
      <button @click="$emit('close')" class="absolute top-0 right-0 m-4 text-gray-300 hover:text-white focus:outline-none">
        <i class="fas fa-times"></i>
      </button>
  
      <!-- Display Pokémon front sprite -->
      <img
        v-if="pokemonDetails"
        :src="pokemonDetails.sprites.front_default"
        :alt="pokemonDetails.name"
        class="w-32 h-32 mb-4"
      />
  
      <!-- Display Pokémon information -->
      <div v-if="pokemonDetails">
        <h2 class="text-2xl font-bold mb-2">{{ capitalizeFirstLetter(pokemonDetails.name) }}</h2>
        <div class="mb-2">
          <span class="font-bold">ID:</span> {{ pokemonDetails.id }}
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
  </style>
  