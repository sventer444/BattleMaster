//pokemonUtils.js

export const getNextAvailableSlot = (slotArray) => {
      const availableSlots = Object.keys(slotArray);
      return availableSlots.length > 0 ? Math.max(...availableSlots) + 1 : 0;
};

export const swapPokemonSlots = (obj1, obj2, key1, key2) => {
    const temp = obj1[key1];
    delete obj1[key1];
    obj1[key1] = obj2[key2];
    delete obj2[key2];
    obj2[key2] = temp;
  };


export const createPokemonObject = (pokemonDetails) => {
    const newPokemon = {
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      sprites: pokemonDetails?.sprites,
      icon: pokemonDetails?.sprites?.versions['generation-viii'].icons,
      types: pokemonDetails?.types,
      status: 'none',
      shiny: false,
      level: 1,
      experience: 0,
      stats: {
        hp: 1,
        attack: 1,
        specialAttack: 1,
        defense: 1,
        specialDefense: 1,
        speed: 1,
      },
      base_stats: {
        hp: 1,
        attack: 1,
        specialAttack: 1,
        defense: 1,
        specialDefense: 1,
        speed: 1,
      },
      details: pokemonDetails,
    };

    for (const stat of pokemonDetails.stats) {
      switch (stat.stat.name) {
        case 'attack':
          newPokemon.stats.attack = stat.base_stat;
          newPokemon.base_stats.attack = stat.base_stat;
          break;
        case 'hp':
          newPokemon.stats.hp = stat.base_stat;
          newPokemon.base_stats.hp = stat.base_stat;
          break;
        case 'special-attack':
          newPokemon.stats.specialAttack = stat.base_stat;
          newPokemon.base_stats.specialAttack = stat.base_stat;
          break;
        case 'defense':
          newPokemon.stats.defense = stat.base_stat;
          newPokemon.base_stats.defense = stat.base_stat;
          break;
        case 'special-defense':
          newPokemon.stats.specialDefense = stat.base_stat;
          newPokemon.base_stats.specialDefense = stat.base_stat;
          break;
        case 'speed':
          newPokemon.stats.speed = stat.base_stat;
          newPokemon.base_stats.speed = stat.base_stat;
          break;
        // Add other cases as needed
      }
    }

    return newPokemon;
  };
  
  export default { createPokemonObject, getNextAvailableSlot, swapPokemonSlots };
  