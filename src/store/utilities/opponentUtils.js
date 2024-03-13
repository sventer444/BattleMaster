
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
    return totalDamage;
};

export const calculateTypeBonus = (attackerTypes, targetTypes) => {
    var typeDamageBonus = 1;
    const attackerKeys = Object.keys(attackerTypes);
    const targetKeys = Object.keys(targetTypes);
  
    attackerKeys.forEach((attackKey) => {
      const attackerTypeName = attackerTypes[attackKey].name;
      targetKeys.forEach((targetKey) => {
        const target = targetTypes[targetKey].damage_relations;
        const noDamageArray = Object.values(target.no_damage_from);
        const halfDamageArray = Object.values(target.half_damage_from);
        const doubleDamageArray = Object.values(target.double_damage_from);
  
        const noDamage = noDamageArray.some(obj => obj.name === attackerTypeName);
        const halfDamage = halfDamageArray.some(obj => obj.name === attackerTypeName);
        const doubleDamage = doubleDamageArray.some(obj => obj.name === attackerTypeName);
  
        if (noDamage){
            typeDamageBonus = 0;
        }
        else if (halfDamage){
            typeDamageBonus = typeDamageBonus *.5
        }
        else if (doubleDamage){
            typeDamageBonus = typeDamageBonus * 2;
        }
      });
    });
    return typeDamageBonus;
  };
  

export default { opponentData, calculateDamage, calculateTypeBonus };