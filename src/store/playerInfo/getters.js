// store/playerInfo/getters.js
export default {
    badgeCase: (state) => state.bag.badges,
    getPlayerTeam: (state) => state.playerTeam,
    getPlayerPc: (state) => state.playerPc,
    isActiveRun: (state) => state.activeRun,
    getUnlockedRegions: (state) => state.unlockedRegions,
    getSelectedPokemon1: (state) => state.selectedPokemon1,
    getSelectedPokemon2: (state) => state.selectedPokemon2,
    getAttackDamage: (state) => state.playerTeamAttackDamage,
    getRareCandies: (state) => state.bag.rareCandy,
    getMasterBalls: (state) => state.bag.masterBall,
    getBottleCaps: (state) => state.bag.bottleCap,
    getGoldBottleCaps: (state) => state.bag.goldBottleCap
  };
  