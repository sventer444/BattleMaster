const express = require("express");
const axios = require("axios"); // For making API requests

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// API route to fetch Pokémon data
app.get('/api/pokemon', async (req, res) => {
    try {
        const limit = req.query.limit || 151; // Default to the first 151 Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        
        // Map the data to extract relevant details
        const pokemonData = response.data.results.map((pokemon, index) => ({
            id: index + 1, // Pokémon IDs start at 1
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));

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
