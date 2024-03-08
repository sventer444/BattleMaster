export default (isTest = false) => {
  if (isTest) {
    return {
      rareCandy: 50,
      badges: [true, true, true, true, true, true, true, false],
      locationsWhitelist: ['Professors Lab', 'Route 1', 'Viridian City'],
      playerDex: ['mew', 'bulbasaur', 'charmander', 'squirtle'],
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
