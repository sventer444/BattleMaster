// store/playerInfo/actions.js
import createState from './state';
import { createPokemonObject, getNextAvailableSlot, swapPokemonSlots } from './pokemonUtils';
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
          this.selectedPokemon1 = {pokemon: pokemon, slot: slot};
        } else if (this.selectedPokemon2 === null) {
          this.selectedPokemon2 = {pokemon: pokemon, slot: slot};
          this.swapSelectedPokemon();
        } 
      },
      // New action to swap the selected Pokémon
      swapSelectedPokemon() {
        if (this.selectedPokemon1 && this.selectedPokemon2) {
        const {pokemon: pokemon1, slot: slot1} = this.selectedPokemon1;
        const {pokemon: pokemon2, slot: slot2} = this.selectedPokemon2;
        console.log('swapping ', pokemon1, pokemon2);

          const bothInTeam = this.playerTeam.includes(pokemon1) && this.playerTeam.includes(pokemon2);
          const bothInPc = this.playerPc[pokemon1] && this.playerPc[pokemon2];
          const inTeamAndPc = this.playerTeam.includes(pokemon1) && this.playerPc[pokemon2];
          const inPcAndTeam = this.playerPc[pokemon1] && this.playerTeam.includes(pokemon2);
          if (pokemon1 != 'Empty Team Slot' && pokemon2 !='Empty Team Slot'){
            if (bothInTeam) {
              // Call the utility function to swap Pokémon slots if both in player team
              swapPokemonSlots(this.playerTeam, this.playerTeam, slot1, slot2);
            } else if (bothInPc) {
              // Call the utility function to swap Pokémon slots if both in PC
              swapPokemonSlots(this.playerPc, this.playerPc, slot1, slot2);
            } else if (inTeamAndPc) {
              // Call the utility function to swap Pokémon slots if both in PC
              swapPokemonSlots(this.playerTeam, this.playerPc, slot1, slot2);
            } else if (inPcAndTeam) {
              // Call the utility function to swap Pokémon slots if both in PC
              swapPokemonSlots(this.playerPc, this.playerTeam, slot1, slot2);
            }
        }
        else{
          if (pokemon1 == 'Empty Team Slot'){
          this.playerTeam[slot1] = pokemon2;
          this.playerTeam[slot2] = null;
            }
          else if (pokemon2 == 'Empty Team Slot'){
             this.playerTeam[slot2] = pokemon1;
             this.playerTeam[slot1] = null;}
          else if (pokemon1 == 'Empty Pc Slot'){ this.playerPc[slot1] = pokemon2;
            this.playerPc[slot2] = null;}
          else if (pokemon2 == 'Empty Pc Slot'){ this.playerPc[slot2] = pokemon1;
            this.playerPc[slot1] = null;}
          else {console.log('The pokemon were not set', pokemon1, pokemon2);}
         }
         console.log('Array after swap', this.playerPc);
          // Reset selected Pokémon
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
  

