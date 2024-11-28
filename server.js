const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// API route to fetch Pokémon data
app.get('/api/pokemon', async (req, res) => {
    try {
        const { name, limit } = req.query;
        const url = name
            ? `https://pokeapi.co/api/v2/pokemon/${name}`  // Fetch by Pokémon name
            : `https://pokeapi.co/api/v2/pokemon?limit=${limit || 151}`;  // Fetch by limit if no name provided

        const response = await axios.get(url);

        let pokemonData;
        if (name) {
            // If we have a name, get the Pokémon and both sprite types
            pokemonData = {
                id: response.data.id,
                name: response.data.name,
                sprite: response.data.sprites.front_default,  // The front sprite (used in battle, etc.)
                pcSprite: response.data.sprites.other.dream_world.front_default, // The PC box sprite (small, pixel art style)
            };
        } else {
            // Default behavior (for limit-based queries)
            pokemonData = response.data.results.map((pokemon, index) => ({
                id: index + 1, // Pokémon IDs start at 1
                name: pokemon.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                pcSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`, // Using official artwork for PC box sprite
            }));
        }

        res.json(pokemonData);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        res.status(500).send('Error fetching Pokémon data');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
