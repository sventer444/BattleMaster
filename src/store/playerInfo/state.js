export default (isTest = false) => {
  if (isTest) {
    return {
      rareCandy: 10,
      badges: [true, true, true, true, true, true, true, false],
      locationsWhitelist: ['Professors Lab', 'Route 1', 'Viridian City'],
      playerTeam: {
        0: {
          id: 1,
          name: 'Bulbasaur',
          sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
          },
          icon: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/1.png',
          },
          types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
          stats: [
            { base_stat: 45, stat: { name: 'hp' } },
            { base_stat: 49, stat: { name: 'attack' } },
            { base_stat: 49, stat: { name: 'defense' } },
            { base_stat: 65, stat: { name: 'special-attack' } },
            { base_stat: 65, stat: { name: 'special-defense' } },
            { base_stat: 45, stat: { name: 'speed' } },
          ],
        },
      },
      playerPc: {
        0: {
          id: 4,
          name: 'Charmander',
          sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
            back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
          },
          icon: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/4.png',
          },
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
      },
    };
  }

  // Default data
  return {
    isAuthenticated: false,
    username: null,
    password: null,
    rareCandy: 0,
    badges: [false, false, false, false, false, false, false, false],
    locationsWhitelist: ['Professors Lab'],
    playerTeam: {},
    playerPc: {},
    selectedPokemon1: null,
    selectedPokemon2: null,
  };
};
