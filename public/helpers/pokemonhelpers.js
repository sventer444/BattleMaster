var playerTeam = [];

export function getPlayerTeam(){
    return playerTeam;
}

export function addPokemonToPlayerTeam(pokemon){
    if (playerTeam.length >= 6) {
        console.log('Player team is full.');
        return;
    }

    // Fetch the Pokémon data
    // const newPokemon = await scene.fetchPokemon('name=charmander');
    // if (newPokemon) {
    //     const spriteKey = newPokemon.name; // Use Pokémon name as key
    //     scene.load.image(spriteKey, newPokemon.icon); // Load sprite with name as key

    //     scene.playerTeam.push(newPokemon); // Add Pokémon to the team
    //     console.log(`Added ${newPokemon.name} to player team.`);

    //     // Ensure sprite is displayed after loading
    //     scene.load.once('complete', () => {
    //         scene.displayPlayerTeam(); // Update the display
    //     });
    //     scene.load.start(); // Start the loading process
    // } else {
    //     console.error('Failed to add new Pokémon to team.');
    // }

    playerTeam.push(pokemon);
}

export async function fetchPokemon(scene, pokemonName) {
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
                 return pokemon; // Return the first Pokémon
            }
            console.warn(`No data returned for query: ${pokemonName}`);
            return null;
        } catch (error) {
            console.error(`Error fetching Pokémon data for query: ${pokemonName}`, error);
            return null;
        }
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

