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

// export async function preloadPokemonSprite(scene, spriteUrl, key) {
//     if (!spriteUrl || !key) {
//         console.error('Invalid sprite URL or key:', { spriteUrl, key });
//         return;
//     }

//     scene.load.image(key, spriteUrl);
//     await new Promise(resolve => {
//         scene.load.once('complete', resolve);
//         scene.load.start();
//     });
// }

