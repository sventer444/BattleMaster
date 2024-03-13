// store/playerInfo/actions.js
import createState from './state';
import { createPokemonObject, getNextAvailableSlot, swapPokemonSlots } from '../utilities/pokemonUtils';
import { validateUser } from '../utilities/loginUtils';
import { useGameInfoStore } from '../gameInfo';
import { calculateDamage, calculateTypeBonus } from '../utilities/opponentUtils';


export default {
    async login(username, password) {
      const isTestUser = validateUser(username, password);
      await useGameInfoStore().setRegionDex('kanto')
      
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
      this.playerTeam = {};
      this.playerPc = {};
      this.unlockedRegions = ['1'];
      this.activeRun = false;
      
      this.resetSelectedPokemon();
    },
      // New action to set selected Pokémon
      setSelectedPokemon(pokemon, slot, type) {
        if (this.selectedPokemon1 === null) {
          this.selectedPokemon1 = {pokemon: pokemon, slot: slot, type: type};
          // console.log('selected a single pokemon ', this.selectedPokemon1);
        } else if (this.selectedPokemon2 === null) {
          this.selectedPokemon2 = {pokemon: pokemon, slot: slot, type: type};
          this.swapSelectedPokemon();
        } 
      },
  startRun(){
    this.activeRun = true;
  },
      
// New action to swap the selected Pokémon
swapSelectedPokemon() {
  if (this.selectedPokemon1 && this.selectedPokemon2) {
    const { pokemon: pokemon1, slot: slot1, type: type1 } = this.selectedPokemon1;
    const { pokemon: pokemon2, slot: slot2, type: type2 } = this.selectedPokemon2;

    // If neither pokemon is a string
    if (!(typeof pokemon1 === 'string') && !(typeof pokemon2 === 'string')){
      const bothInTeam = type1 == 'Team' && type2 == 'Team';
      const bothInPc = type1 == 'Pc' && type2 == 'Pc';
      const inTeamAndPc = type1 == 'Team' && type2 == 'Pc';
      const inPcAndTeam = type1 == 'Pc' && type2 == 'Team';

      if (bothInTeam) {
        // Call the utility function to swap Pokémon slots if both in player team
        swapPokemonSlots(this.playerTeam, this.playerTeam, slot1, slot2);
      } else if (bothInPc) {
        // Call the utility function to swap Pokémon slots if both in PC
        swapPokemonSlots(this.playerPc, this.playerPc, slot1, slot2);
      } else if (inTeamAndPc) {
        // Call the utility function to swap Pokémon slots if one in team and the other in PC
        swapPokemonSlots(this.playerTeam, this.playerPc, slot1, slot2);
      } else if (inPcAndTeam) {
        // Call the utility function to swap Pokémon slots if one in PC and the other in team
        swapPokemonSlots(this.playerPc, this.playerTeam, slot1, slot2);
      } 
    }
    else if ((typeof pokemon1 != 'string') ^ (typeof pokemon2 != 'string')){
      // Handle cases where one or both Pokémon are in empty slots
      if (typeof pokemon2 === 'string' && type2 == 'Team') {
        this.playerTeam[slot2] = pokemon1;
      } else if (typeof pokemon2 === 'string' && type2 == 'Pc') {
        this.playerPc[slot2] = pokemon1;
      } else {
        console.log('The pokemon were not set', pokemon1, pokemon2);
      }
      // Clean up old pokemon
      (type1 == 'Team')? delete this.playerTeam[slot1] : delete this.playerPc[slot1];
    }
    // Reset selected Pokémon
    this.resetSelectedPokemon();
  }
},
resetSelectedPokemon() {
    this.selectedPokemon1 = null;
    this.selectedPokemon2 = null;
},
  
    addToPlayerTeam(pokemonDetails) {
      const nextAvailableSlot = getNextAvailableSlot(this.playerTeam);
      const newPokemon = createPokemonObject(pokemonDetails);
      useGameInfoStore().addToPokedex(newPokemon);
      if (nextAvailableSlot < 6){
        this.playerTeam[nextAvailableSlot] = newPokemon;
      }
      else{
        this.addToPlayerPc(newPokemon);
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

    calculateAndApplyDamage(damageType, opponentDetails) {
      const teamKeys = Object.keys(this.playerTeam);
      const teamDamage = teamKeys.map((key) => {
        const pokemon = this.playerTeam[key];
        return this.calculateDamage(pokemon, opponentDetails, damageType);
      }, this);
      this.applyDamage(teamDamage, opponentDetails);
    },

    calculateDamage(pokemon, opponentDetails, damageType) {
        const attackStat = (damageType == 'physical') ? pokemon.stats.attack
        : pokemon.stats.specialAttack;
        const defenseStat = (damageType == 'physical') ? opponentDetails.stats.defense
        : pokemon.stats.specialDefense;

        // TODO implement crits

        const typeBonus = calculateTypeBonus(pokemon.types, opponentDetails.types);
        const totalDamage = calculateDamage(pokemon.level, attackStat, defenseStat)*typeBonus
        const damage = {
          damage: Math.max(1, Math.round(totalDamage)),
          efficacy: typeBonus,
        }

        return damage;
    },

    applyDamage(teamDamage, opponentDetails) {
      this.playerTeamAttackDamage = teamDamage;
      teamDamage.map((damage) => {
       // this.playerTeamAttackDamage[index] = null;
        opponentDetails.currentHp = Math.max(1, opponentDetails.currentHp - damage.damage);
      });
    },

    initializeTestData() {
        const gameInfo = useGameInfoStore();
        this.activeRun = false;
        // Retrieve the test data from the state
        const testData = createState(true);

        this.rareCandy = testData.rareCandy;
        this.badges = testData.badges;
        this.unlockedRegions = [...testData.unlockedRegions];
        this.locationsWhitelist = [...testData.locationsWhitelist];
        testData.playerDex.map((pokemon) => {
          gameInfo.getPokemonDetails(pokemon)
            .then((pokemonDetails) => {
              this.addToPlayerTeam(pokemonDetails);
            })
            
        });
      },
  };
  

