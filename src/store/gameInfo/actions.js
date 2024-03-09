// store/gameInfo/actions.js

import { fetchPokemonDetailsByName, fetchRegionDexByUrl, fetchRegionDataByUrl } from '../utilities/pokemonUtils';


export default {

    // Fetch the region dex and save it to the regionDex array
    async setRegionDex(regionName) {
      const regionData =  this.regions.find(region => region.name === regionName);
      const pokemonNames = await fetchRegionDexByUrl(regionData.regionDexUrl)
        pokemonNames.map((pokemonName) => {
          this.regionDex[pokemonName] = pokemonName;
        });
    },

    // Get details from the api for a given name
    getPokemonDetails(pokemonName){
      if(typeof this.regionDex[pokemonName] === 'string'){
        return fetchPokemonDetailsByName(pokemonName)
        .then((pokemonDetails) => {
          this.regionDex[pokemonName] = pokemonDetails;
          return pokemonDetails;
        });
      }
      else {
        return this.regionDex[pokemonName];
      }
    },

    // Add Pokemon to the Pokedex
    addToPokedex(pokemonDetails) {
      const pokemonIndex = pokemonDetails.id - 1;
      if (!this.pokedex[pokemonIndex]) {
        this.pokedex[pokemonIndex] = pokemonDetails;
      }
    },

    setRegion(regionNumber) {
        fetchRegionDataByUrl(`https://pokeapi.co/api/v2/region/${regionNumber}`)
        .then((regionData) => {
          this.regions.push(regionData);
        });
      },

    // Clear the Pokedex
    clearPokedex() {
      this.pokedex = [];
    },

    // Log the current Pokemon list
    logPokedex() {
      console.log('Current Pokemon List:', this.pokedex);
    },
  };
  