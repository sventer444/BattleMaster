export default (isTest = false) => {
  if (isTest) {
    return {
      rareCandy: 50,
      badges: [true, true, true, true, true, true, true, false],
      locationsWhitelist: ['Professors Lab', 'Route 1', 'Viridian City'],
      playerDex: ['charmander', 'squirtle', 'bulbasaur', 'mew',],
      unlockedRegions: ['1'],
    };
  }

  // Default data
  return {
    isAuthenticated: false,
    activeRun: false,
    username: null,
    password: null,
    rareCandy: 0,
    badges: [false, false, false, false, false, false, false, false],
    locationsWhitelist: ['Professors Lab'],
    unlockedRegions: ['1'],
    playerTeam: {},
    playerPc: {},
    selectedPokemon1: null,
    selectedPokemon2: null,
  };
};
