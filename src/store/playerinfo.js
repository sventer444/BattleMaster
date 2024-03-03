// src/store/playerInfo.js
import { defineStore } from 'pinia';

export const usePlayerInfoStore = defineStore('playerInfo', {
  state: () => ({
    isAuthenticated: false,
    username: null,
    password: null,
    rareCandy: 0,
    badges: [false, false, false, false, false, false, false, false], // Initialize badges array
    locationsWhitelist: ['Professors Lab'], // Initialize with Professor's Lab
    playerTeam: [],
    playerPc: {},
  }),

  getters: {
    badgeCase() {
      return this.badges; // Return the badges array
    },
    getPlayerTeam() {
      return this.playerTeam;
    },
    getPlayerPc() {
      return this.playerPc;
    }
  },

  actions: {
    login(username, password) {
      // Replace this with your actual authentication logic
      const isValidUser = this.validateUser(username, password);

      if (isValidUser) {
        this.isAuthenticated = true;
        this.username = username;
        this.password = password; // Store the password
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.username = null;
      this.password = null; // Clear the password on logout
    },

    validateUser(username, password) {
      if(username.toLowerCase() == 'god') this.initializeTestData();

      // Replace this with your actual validation logic using a service or API
      // For demonstration purposes, we are accepting any non-empty username and password
      return username.trim() !== '' && password.trim() !== '';
    },

    resetPlayerState() {
      // Reset player game state
      this.rareCandy = 0;
      this.badges = [false, false, false, false, false, false, false, false];
      this.locationsWhitelist = ['Professors Lab'];
      this.playerTeam = {};
      this.playerPc = {};
    },

    addToPlayerTeam(pokemonDetails) {
      
      // Check if the Pokémon is not already in the PC before adding
      const availableSlots = Object.keys(this.playerTeam);
      const slot = availableSlots.length > 0 ? availableSlots.length + 1 : 1;

      // Check if the Pokémon is not already in the team before adding
      if (!this.playerTeam[slot]) {
        const newPokemon = {
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          sprites: pokemonDetails?.sprites,
          icon: pokemonDetails?.sprites?.versions['generation-viii'].icons,
          types: pokemonDetails?.types,
          stats: {
            status: 'none',
            level: 1,
            experience: 0,
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
          details: pokemonDetails
        };
        // Parse pokemonDetails to initialize stats with appropriate base values
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
        console.log('Player has caught ', newPokemon);
        
        this.playerTeam[slot] = newPokemon;
      }
    },

    addToLocationWhitelist(locationName) {
      // Check if the location is not already in the whitelist before adding
      if (!this.locationsWhitelist.includes(locationName)) {
        this.locationsWhitelist.push(locationName);
      }
    },
    addToPlayerPc(pokemonDetails) {
      // Check if the Pokémon is not already in the PC before adding
      const availableSlots = Object.keys(this.playerPc);
      const slot = availableSlots.length > 0 ? Math.max(...availableSlots) + 1 : 0;

      if (!this.playerPc[slot]) {
        // If the slot is not occupied, add the PokemonDetails
        this.playerPc[slot] = pokemonDetails;
      }
    },
    initializeTestData() {
      // Clear existing data
      // this.resetPlayerState();
    
      // Add sample data
      this.rareCandy = 10;
      this.badges = [true, true, true, true, true, true, true, false];
      this.locationsWhitelist = ['Professors Lab', 'Route 1', 'Viridian City'];
    
      // Add sample Pokémon to player team
      this.playerTeam = [{
        id: 1,
        name: 'Bulbasaur',
        sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
        icon: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/1.png' },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        stats: [
          { base_stat: 45, stat: { name: 'hp' } },
          { base_stat: 49, stat: { name: 'attack' } },
          { base_stat: 49, stat: { name: 'defense' } },
          { base_stat: 65, stat: { name: 'special-attack' } },
          { base_stat: 65, stat: { name: 'special-defense' } },
          { base_stat: 45, stat: { name: 'speed' } },
        ],
      }];
    
      // Add sample Pokémon to player PC
      this.playerPc = {
        0: {
          id: 4,
          name: 'Charmander',
          sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
          icon: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/4.png' },
          types: [{ type: { name: 'fire' } }],
          stats: [
            { base_stat: 39, stat: { name: 'hp' } },
            { base_stat: 52, stat: { name: 'attack' } },
            { base_stat: 43, stat: { name: 'defense' } },
            { base_stat: 60, stat: { name: 'special-attack' } },
            { base_stat: 50, stat: { name: 'special-defense' } },
            { base_stat: 65, stat: { name: 'speed' } },
          ],
        },
      };
    },
  },
});
