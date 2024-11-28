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

        if (name) {
            // Fetch a single Pokémon by name
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            const pokemonData = [{
                id: response.data.id,
                name: response.data.name,
                sprite: response.data.sprites.front_default, // Default sprite URL
            }];
            return res.json(pokemonData); // Return as an array for consistency
        }

        // Default behavior: Fetch Pokémon by limit
        const fetchLimit = limit || 151; // Default to the first 151 Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}`);
        const pokemonList = response.data.results.map((pokemon, index) => ({
            id: index + 1, // Pokémon IDs start at 1
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        res.json(pokemonList);
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        res.status(500).send('Error fetching Pokémon data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
