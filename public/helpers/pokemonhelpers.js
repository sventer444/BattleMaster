import Pokemon from './pokemon.js';


export async function loadPokemon(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const [pokemonData] = await response.json(); // Assuming API returns an array
        if (!pokemonData || !pokemonData.sprite) {
            console.error('Pokemon data or sprite is missing:', pokemonData);
            return null;
        }
        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return null;
    }
}



export async function preloadPokemonSprite(scene, spriteUrl, key) {
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

