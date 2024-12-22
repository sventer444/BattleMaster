var playerTeam = [];

export function getPlayerTeam(){
    return playerTeam;
}

export async function addPokemonToPlayerTeam(scene, pokemon){
    if (playerTeam.length >= 6) {
        console.log('Player team is full.');
        return;
    }
    var pokemon = await fetchPokemon(scene, pokemon);
    playerTeam.push(pokemon);
}

export async function fetchPokemon(scene, pokemonName, pokemonLevel = 1) {
        try {
            const response = await fetch(`/api/pokemon?name=${pokemonName}`);
            if (!response.ok) {
                console.error(`Failed to fetch Pokémon. Status: ${response.status}, Query: ${pokemonName}`);
                return null;
            }
    
            const data = await response.json();
            if (data.length > 0){
                var pokemon = data[0];
                // Preload the Pokémon's sprite and Gen VIII icon
                if (pokemon.sprite) {
                    await preloadPokemonSprite(scene, pokemon.sprite, `${pokemon.name}Sprite`);
                } else {
                    console.warn(`Sprite not found for Pokémon: ${pokemonName}`);
                }

                if (pokemon.icon) {
                    await preloadPokemonSprite(scene, pokemon.icon, `${pokemon.name}Icon`);
                } else {
                    console.warn(`Gen VIII Icon not found for Pokémon: ${pokemonName}`);
                }
                
                // Stat calculation formula
                const calculateStat = (base, iv, ev, isHP = false) => {
                    if (isHP) {
                        return Math.floor((2 * base + iv + Math.floor(ev / 4)) * pokemonLevel / 100) + pokemonLevel + 10;
                    } else {
                        return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * pokemonLevel / 100) + 5);
                    }
                };

                
                // Initialize IVs and EVs (random IVs, default EVs to 0)
                const ivs = {
                    hp: Math.floor(Math.random() * 32),
                    attack: Math.floor(Math.random() * 32),
                    defense: Math.floor(Math.random() * 32),
                    "special-attack": Math.floor(Math.random() * 32),
                    "special-defense": Math.floor(Math.random() * 32),
                    speed: Math.floor(Math.random() * 32),
                };
                pokemon.ivs = ivs;

                const evs = {
                    hp: 0,
                    attack: 0,
                    defense: 0,
                    "special-attack": 0,
                    "special-defense": 0,
                    speed: 0,
                };
                pokemon.evs = evs;
                
                // Calculate current stats
                const currentStats = {
                    hp: calculateStat(pokemon.baseStats.hp, ivs.hp, evs.hp, true),
                    attack: calculateStat(pokemon.baseStats.attack, ivs.attack, evs.attack),
                    defense: calculateStat(pokemon.baseStats.defense, ivs.defense, evs.defense),
                    "special-attack": calculateStat(pokemon.baseStats["special-attack"], ivs["special-attack"], evs["special-attack"]),
                    "special-defense": calculateStat(pokemon.baseStats["special-defense"], ivs["special-defense"], evs["special-defense"]),
                    speed: calculateStat(pokemon.baseStats.speed, ivs.speed, evs.speed),
                    level: pokemonLevel,
                    exp: 0
                };
                currentStats.currentHp = currentStats.hp;
                pokemon.currentStats = currentStats;
                 return pokemon; // Return the first Pokémon
            }
            console.warn(`No data returned for query: ${pokemonName}`);
            return null;
        } catch (error) {
            console.error(`Error fetching Pokémon data for query: ${pokemonName}`, error);
            return null;
        }
}

export async function getPokemonByEncounterRate(scene, pool) {
    if (!pool || pool.length === 0) {
        console.error('Encounter pool is empty.');
        return null;
    }

    // Calculate total weight
    const totalRate = pool.reduce((sum, pokemon) => sum + pokemon.rate, 0);

    // Generate a random number between 0 and totalRate
    const random = Math.random() * totalRate;

    // Select a Pokémon based on weighted odds
    let cumulativeRate = 0;
    for (const pokemon of pool) {
        cumulativeRate += pokemon.rate;
        if (random <= cumulativeRate) {
            return await fetchPokemon(scene, pokemon.name); // Fetch Pokémon data
        }
    }

    console.error('Failed to select a Pokémon from the pool.');
    return null;
}
// export async function loadPokemon(apiEndpoint) {
//     try {
//         const response = await fetch(apiEndpoint);
//         const data = await response.json();
        
//         if (!Array.isArray(data)) {
//             throw new Error('Unexpected API response format. Expected an array.');
//         }

//         return data[0]; // Always return the first Pokémon (for name queries)
//     } catch (error) {
//         console.error('Error fetching Pokémon:', error);
//         return null;
//     }
// }

async function preloadPokemonSprite(scene, spriteUrl, key) {
    if (!spriteUrl || !key) {
        console.error('Invalid sprite URL or key:', { spriteUrl, key });
        return;
    }

    scene.load.image(key, spriteUrl);
    await new Promise(resolve => {
        scene.load.once('complete', resolve);
        scene.load.start();
    });
}

