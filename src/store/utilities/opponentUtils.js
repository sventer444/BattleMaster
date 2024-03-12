
export const opponentData = {
    "rival": {
        team: {
            "0": "bulbasaur"
        }
    }
};

export const calculateTeamPhysicalDamage = (playerTeam, opponent) => {
    const teamKeys = Object.keys(playerTeam);
    const teamDamage = teamKeys.map((teamKey) =>{
        const pokemon = playerTeam[teamKey];
        const levelDamage = (((2*pokemon.level)/5)+2);
        const rawDamage = ((levelDamage * (pokemon.stats.attack / opponent.stats.defense))/50)+2;
        const randomValue = (Math.floor(Math.random() * (100 - 85 + 1) + 85) / 100);
        const totalDamage = rawDamage * randomValue;
        console.log('Calculating raw damage', totalDamage);
        return Math.floor(totalDamage);
    });
    return teamDamage;
};

export const calculateTeamSpecialDamage = (playerTeam, opponent) => {
    const teamKeys = Object.keys(playerTeam);
    const teamDamage = teamKeys.map((teamKey) =>{
        const pokemon = playerTeam[teamKey];
        const levelDamage = (((2*pokemon.level)/5)+2);
        const rawDamage = ((levelDamage * (pokemon.stats.specialAttack / opponent.stats.specialDefense))/50)+2;
        const randomValue = (Math.floor(Math.random() * (100 - 85 + 1) + 85) / 100);
        const totalDamage = rawDamage * randomValue;
        console.log('Calculating raw damage', totalDamage);
        return Math.floor(totalDamage);
    });
    return teamDamage;
};


export default { opponentData, calculateTeamPhysicalDamage, calculateTeamSpecialDamage };