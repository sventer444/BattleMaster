
export const opponentData = {
    "rival": {
        team: {
            "0": "bulbasaur"
        }
    }
};

export const calculateDamage = (level, attack, defense) => {
    
    const levelDamage = (((2*level)/5)+2);
    const rawDamage = ((levelDamage * (attack / defense))/50)+2;
    const randomValue = (Math.floor(Math.random() * (100 - 85 + 1) + 85) / 100);
    const totalDamage = rawDamage * randomValue;
    return Math.round(totalDamage);
};

export const calculateTypeBonus = (attackerTypes, targetTypes) => {
    console.log('attacker type', attackerTypes, 'opponent type', targetTypes);
    return 1;
};

export default { opponentData, calculateDamage, calculateTypeBonus };