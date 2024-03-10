// store/playerInfo/getters.js
export default {
    badgeCase: (state) => state.badges,
    getPlayerTeam: (state) => state.playerTeam,
    getPlayerPc: (state) => state.playerPc,
    isActiveRun: (state) => state.activeRun,
    getUnlockedRegions: (state) => state.unlockedRegions,
    getSelectedPokemon1: (state) => state.selectedPokemon1,
    getSelectedPokemon2: (state) => state.selectedPokemon2,
  };
  