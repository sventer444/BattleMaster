const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// In-memory cache for Pokémon data
let pokemonCache = {};

// Function to preload all Pokémon data into cache
// Function to preload all Pokémon data into cache
const preloadPokemonData = async () => {
    try {
        console.log("Preloading Pokémon data...");
        // temporary cap to 151 for testing
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151'); // Adjust limit for all Pokémon 1010
        const pokemonList = response.data.results;

        // Fetch detailed data for each Pokémon
        const detailedDataPromises = pokemonList.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            const detail = detailResponse.data;

            // Calculate initial stats
            const baseStats = detail.stats.map((stat) => ({
                name: stat.stat.name,
                base: stat.base_stat,
            }));

            // Calculate total HP (based on Pokémon base HP and example level logic)
            const initialLevel = 5; // Default level for a new Pokémon
            const baseHP = baseStats.find((stat) => stat.name === 'hp').base;
            const totalHP = Math.floor((2 * baseHP * initialLevel) / 100 + initialLevel + 10);
            
            // Initialize current HP to total HP
            const currentHP = totalHP;

            // Store in cache with both name and ID as keys
            const formattedData = {
                id: detail.id,
                name: detail.name,
                sprite: detail.sprites.front_default,
                icon: detail.sprites.versions['generation-viii'].icons.front_default,
                abilities: detail.abilities,
                base_experience: detail.base_experience,
                order: detail.order,
                stats: baseStats, // Store stats as { name, base }
                types: detail.types,
                level: initialLevel, // Default starting level
                currentHP: currentHP, // Starting current HP
                totalHP: totalHP, // Starting total HP
            };

            pokemonCache[detail.id] = formattedData; // Use ID as key
            pokemonCache[detail.name.toLowerCase()] = formattedData; // Use name as key (case-insensitive)
        });

        await Promise.all(detailedDataPromises);
        console.log("Pokémon data preloaded successfully.");
    } catch (error) {
        console.error("Error preloading Pokémon data:", error);
    }
};

// API route to fetch Pokémon data
app.get('/api/pokemon', async (req, res) => {
    try {
        const { name, id } = req.query;

        if (pokemonCache.length === 0) {
            console.error('Server cache is empty. Pokémon data not preloaded.');
            return res.status(500).send('Pokémon data not preloaded.');
        }

        const queryKey = name?.toLowerCase() || id;

        const pokemon = pokemonCache[queryKey]; // Query cache using name (lowercased) or id

        if (pokemon) {
            console.log(`Returning Pokémon for query: ${queryKey}`, pokemon);
            return res.json([pokemon]); // Return as an array for consistency
        } else {
            console.warn(`No Pokémon found for query: ${queryKey}. Current cache:`, pokemonCache);
            return res.status(404).send('Pokémon not found.');
        }
    } catch (error) {
        console.error('Error handling Pokémon API request:', error);
        res.status(500).send('Internal server error.');
    }
});

// Start the server and preload data
app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    await preloadPokemonData(); // Preload all Pokémon data into memory
});
