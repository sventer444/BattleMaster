// store/playerInfo/actions.js
import createState from './state';
import { createPokemonObject, getNextAvailableSlot } from './pokemonUtils';
import { validateUser } from './loginUtils';


export default {
    login(username, password) {
      const isTestUser = validateUser(username, password);
  
      if (isTestUser) {
        this.initializeTestData();
      }
        this.isAuthenticated = true;
        this.username = username;
        this.password = password;
    },
  
    logout() {
      this.isAuthenticated = false;
      this.username = null;
      this.password = null;
    },
  
    resetPlayerState() {
      this.rareCandy = 0;
      this.badges = [false, false, false, false, false, false, false, false];
      this.locationsWhitelist = ['Professors Lab'];
      this.playerTeam = [];
      this.playerPc = {};
      
      this.resetSelectedPokemon();
    },
      // New action to set selected Pokémon
      setSelectedPokemon(pokemon, slot) {
        if (this.selectedPokemon1 === null) {
          this.selectedPokemon1 = { pokemon, slot };
        } else if (this.selectedPokemon2 === null) {
          this.selectedPokemon2 = { pokemon, slot };
          this.swapSelectedPokemon();
        } else {
          // If two Pokémon are already selected, reset the selection
          this.resetSelectedPokemon();
        }
      },
  
      // New action to reset selected Pokémon
      resetSelectedPokemon() {
        this.selectedPokemon1 = null;
        this.selectedPokemon2 = null;
      },
  
  
    addToPlayerTeam(pokemonDetails) {
      const nextAvailableSlot = getNextAvailableSlot(this.playerTeam);
      if (nextAvailableSlot < 6){
        const newPokemon = createPokemonObject(pokemonDetails);

        this.playerTeam[nextAvailableSlot] = newPokemon;
      }
      else{
        this.addToPlayerPc(pokemonDetails);
      }
      this.resetSelectedPokemon(); // Reset selected Pokémon after adding
    },
  
    addToLocationWhitelist(locationName) {
      if (!this.locationsWhitelist.includes(locationName)) {
        this.locationsWhitelist.push(locationName);
      }
    },
  
    addToPlayerPc(pokemonDetails) {
      const nextAvailableSlot = getNextAvailableSlot(this.playerPc);
      if (!this.playerPc[nextAvailableSlot]) {
        this.playerPc[nextAvailableSlot] = pokemonDetails;
      }
    },

    initializeTestData() {
        this.resetPlayerState();
    
        // Retrieve the test data from the state
        const testData = createState(true);
    
        this.rareCandy = testData.rareCandy;
        this.badges = [...testData.badges];
        this.locationsWhitelist = [...testData.locationsWhitelist];
        this.playerTeam = [...testData.playerTeam];
        this.playerPc = { ...testData.playerPc };
      },
  };
  

