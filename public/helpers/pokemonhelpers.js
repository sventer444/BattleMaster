export async function loadPokemon(apiEndpoint) {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        if (!Array.isArray(data)) {
            throw new Error('Unexpected API response format. Expected an array.');
        }

        return data[0]; // Always return the first Pokémon (for name queries)
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

