// store/playerInfo/actions.js
import createState from './state';
import { createPokemonObject, determineAttackStat, determineCrit, determineDefenseStat, getNextAvailableSlot, healPokemon, swapPokemonSlots } from '../utilities/pokemonUtils';
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

    getFirstHealthyFromTeam (team) {
      // Find the next healthy opponent Pokemon
      const nextHealthyPokemon = Object.values(team).find(pokemon => pokemon.currentHp > 0);
      return (!nextHealthyPokemon) ? null : nextHealthyPokemon;
    },

    caclulateAndApplyOpponentDamage(opponentDetails){
      const target = this.getFirstHealthyFromTeam(Object.values(this.playerTeam));
      const physDamage = this.calculateDamage(opponentDetails, target, 'physical');
      const specDamage = this.calculateDamage(opponentDetails, target, 'special');
      let damage = (physDamage.damage < specDamage.damage) ? specDamage.damage : physDamage.damage;
      this.applyOpponentDamage(damage, target);
    },

    calculateAndApplyTeamDamage(damageType, opponentDetails) {
      // Calc Team Damage
      const teamDamage = this.calculateTeamDamage(opponentDetails, damageType);

      // Calc Pc Damage
      const pcDamage = this.calculatePcDamage(damageType, opponentDetails);

      this.applyTeamDamage((teamDamage + pcDamage), opponentDetails);
    },

    calculateTeamDamage(target, damageType){
      const teamKeys = Object.keys(this.playerTeam);
      const teamDamage = teamKeys.map((key) => {
        const pokemon = this.playerTeam[key];
        const damage = this.calculateDamage(pokemon, target, damageType);
        target = pokemon;
        return damage;
      }, this);
      this.playerTeamAttackDamage = teamDamage;
      const totalTeamDamage = teamDamage.reduce((total, current) => {
        return total += (current.damage);
      }, 0);
      return totalTeamDamage;
    },

    calculatePcDamage(damageType, targetDetails){
      const pcKeys = Object.keys(this.playerPc);
      const pcDamage = pcKeys.reduce((total, key) => {
        const pokemon = this.playerPc[key];
        // Pc damage is flat
        const attackStat = determineAttackStat(damageType, pokemon);
        const defenseStat = determineDefenseStat(damageType, targetDetails);
        
        const rawDamage = calculateDamage(pokemon.level, attackStat, defenseStat);
        return total += rawDamage.damage;
      }, 0);
      return pcDamage;
    },

    calculateDamage(pokemon, targetDetails, damageType) {
        const attackStat = determineAttackStat(damageType, pokemon);
        const defenseStat = determineDefenseStat(damageType, targetDetails);

        // Calculate Crit
        const critValid = determineCrit(pokemon.stats.speed, targetDetails.stats.speed);
        console.log('crit happened', critValid);

        const typeBonus = calculateTypeBonus(pokemon.types, targetDetails.types);
        const rawDamage = calculateDamage(pokemon.level, attackStat, defenseStat);
        let totalDamage = Math.max(1, Math.round(rawDamage*typeBonus));
        // Apply crit
        if (critValid) totalDamage = totalDamage * 2.5;
        const damage = {
          damage: totalDamage,
          efficacy: typeBonus,
          crit: critValid
        };

        return damage;
    },

    endBattle(){
        // Restore Party Health
        const playerValues = Object.values(this.playerTeam);
        playerValues.map(pokemon =>{
          healPokemon(pokemon);
        });
        console.log(this.playerTeam);
        // ??? Anything else?
          // Drops?
    },

    applyTeamDamage(teamDamage, opponentDetails) {
      opponentDetails.currentHp = Math.max(0, opponentDetails.currentHp - teamDamage);
      // Apply exp if opponent hp 0
    },

    applyOpponentDamage(damage, target){
      // Subtract the damage from the target's current HP
      target.currentHp -= damage;
      // Check if the target's current HP is 0 or less
      if (target.currentHp <= 0) {
        // If the target's current HP is 0 or less, determine the remaining damage
        var remainingDamage = Math.abs(target.currentHp);
        target.currentHp = 0;
        const newTarget = this.getFirstHealthyFromTeam(Object.values(this.playerTeam));
        if (newTarget != null) {
          this.applyDamage(remainingDamage, newTarget);
        }
      }
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
  

