// store/gameInfo/actions.js
import { opponentData } from '../utilities/opponentUtils';
import { fetchPokemonDetailsByName, fetchRegionDexByUrl, fetchRegionDataByUrl, createPokemonObject,  } from '../utilities/pokemonUtils';


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
    async getOpponentDetails(opponentName) {
      const opponentDetails = opponentData[opponentName];
      const opponentTeamSlots = Object.keys(opponentDetails.team);
    
      const promisedOpponentTeam = Promise.all(opponentTeamSlots.map(async (key) => {
        const pokemonDetails = await this.getPokemonDetails(opponentDetails.team[key]);
        const pokemonObject = createPokemonObject(pokemonDetails);
        return pokemonObject;
      }));
    
      opponentDetails.team = await promisedOpponentTeam;
      return opponentDetails;
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
  