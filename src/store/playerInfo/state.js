export default (isTest = false) => {
  if (isTest) {
    return {
      bag: {
        rareCandy: 50,
        badges: 10,
        bottleCap: 500,
        goldBottleCap: 100,
        masterBall: 5,
      },
      locationsWhitelist: ['Professors Lab', 'Route 1', 'Viridian City'],
      playerDex: [ 'squirtle', 'bulbasaur', 'mew',],
      unlockedRegions: ['1'],
    };
  }

  // Default data
  return {
    isAuthenticated: false,
    activeRun: false,
    username: null,
    password: null,
    bag: {
      rareCandy: 0,
      badges: 0,
      bottleCap: 0,
      goldBottleCap: 0,
      masterBall: 0,
    },
    locationsWhitelist: ['Professors Lab'],
    unlockedRegions: ['1'],
    playerTeam: {},
    playerPc: {},
    playerTeamAttackDamage: Array(6).fill(null),
    playerPcDamage: 0,
    selectedPokemon1: null,
    selectedPokemon2: null,
  };
};
