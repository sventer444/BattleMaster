//pokemonUtils.js
import axios from 'axios';

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

// Fetch details for a single Pokemon by Name
export const fetchPokemonDetailsByName = async (pokemonName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Pokemon ID ${pokemonName}:`, error);
    return null;
  }
};

// Fetch pokemon listed in regions dex
export const fetchRegionDexByUrl = async (regionUrl) => {
  try {
    const response = await axios.get(regionUrl);
    const pokemonEntries = response.data.pokemon_entries;

    // Extract Pokemon names from the entries and add to the regionDex array
    const pokemonNames = pokemonEntries.map(entry => entry.pokemon_species.name);
    return pokemonNames;
  } catch (error) {
    console.error(`Error fetching region dex for ${regionUrl}:`, error);
  }
};

export const fetchAllRegionsData = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/region');
    const regionPromises = response.data.results.map(async (region) => {
      await fetchRegionDataByUrl(region.url);
    });

    // Wait for all region details to be fetched
    const allRegions = (await Promise.all(regionPromises)).filter(Boolean);
    return allRegions;
  } catch (error) {
    console.error('Error fetching Pokémon region names:', error);
  }
};

export const fetchRegionDataByUrl = async (regionUrl) => {
  // Initialize with "Professors Lab" location
  const initialLocation = [
    {
      name: 'Professors Lab',
      details: {
        // Add relevant details for the Professors Lab
      },
    },
  ];
  // Fetch additional details for each region, including locations
  try {
    const regionResponse = await axios.get(regionUrl);

    // Extract Pokedex URL from the region response
    const pokedexUrl = regionResponse.data.pokedexes[0].url;
    const regionName = regionResponse.data.name;
    const locationsPromises = regionResponse.data.locations.map(async (location) => {
      // Fetch additional details for each location
      return await fetchLocationDataByUrl(location.url);
    });

    // Wait for all location details to be fetched
    const locations = (await Promise.all(locationsPromises)).filter(Boolean);
    // Combine initialLocations with fetched locations and add Pokedex URL
    const regionData = {
      name: regionName,
      locations: initialLocation.concat(locations),
      regionDexUrl: pokedexUrl,
    };
    return regionData;
  } catch (error) {
    console.error(`Error fetching details for ${regionUrl}:`, error);
    return null;
  }
};

export const fetchLocationDataByUrl = async (locationUrl) => {
  // Fetch additional details for each location
  try {
    const locationResponse = await axios.get(locationUrl);
    return locationResponse.data
  } catch (error) {
    console.error(`Error fetching details for ${locationUrl}:`, error);
    return null;
  }
};

export const createPokemonObject = (pokemonDetails) => {
    const newPokemon = {
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      sprites: pokemonDetails?.sprites,
      icon: pokemonDetails?.sprites?.versions['generation-viii'].icons,
      types: pokemonDetails?.types,
      currentHp: 1,
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
          newPokemon.currentHp = newPokemon.stats.hp;
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
  