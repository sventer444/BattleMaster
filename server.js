const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // To parse JSON bodies

// In-memory cache for Pokémon data
let pokemonCache = {};
// In-memory cache for player data
let playerDataCache = {};

// Preload Pokémon data (same as before)
const preloadPokemonData = async () => {
    try {
        console.log("Preloading Pokémon data...");
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = response.data.results;

        const detailedDataPromises = pokemonList.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            const detail = detailResponse.data;

            const baseStats = detail.stats.reduce((acc, stat) => {
                acc[stat.stat.name] = stat.base_stat;
                return acc;
            }, {});

            const formattedData = {
                id: detail.id,
                name: detail.name,
                sprite: detail.sprites.front_default,
                icon: detail.sprites.versions['generation-viii'].icons.front_default,
                abilities: detail.abilities,
                base_experience: detail.base_experience,
                order: detail.order,
                types: detail.types,
                baseStats: baseStats,
            };

            pokemonCache[detail.id] = formattedData;
            pokemonCache[detail.name.toLowerCase()] = formattedData;
        });

        await Promise.all(detailedDataPromises);
        console.log("Pokémon data preloaded successfully.");
    } catch (error) {
        console.error("Error preloading Pokémon data:", error);
    }
};

// API route to fetch Pokémon data (same as before)
app.get('/api/pokemon', async (req, res) => {
    try {
        const { name, id } = req.query;
        const queryKey = name?.toLowerCase() || id;
        const pokemon = pokemonCache[queryKey];

        if (pokemon) {
            return res.json([pokemon]);
        } else {
            return res.status(404).send('Pokémon not found.');
        }
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
});

// API route to get player data
app.get('/api/player/:playerId', (req, res) => {
    const { playerId } = req.params;
    const playerData = playerDataCache[playerId];

    if (playerData) {
        return res.json(playerData);
    } else {
        return res.status(404).send('Player data not found.');
    }
});

// API route to update player team
app.post('/api/player/:playerId/team', (req, res) => {
    const { playerId } = req.params;
    const { team } = req.body;

    if (!Array.isArray(team)) {
        return res.status(400).send('Team must be an array.');
    }

    if (!playerDataCache[playerId]) {
        playerDataCache[playerId] = {}; // Create new player data if not exists
    }

    playerDataCache[playerId].team = team;
    return res.status(200).send('Player team updated.');
});

// API route to add Pokémon to the Pokédex
app.post('/api/player/:playerId/pokedex', (req, res) => {
    const { playerId } = req.params;
    const { pokemonId } = req.body;

    if (!pokemonId) {
        return res.status(400).send('Pokémon ID is required.');
    }

    if (!playerDataCache[playerId]) {
        playerDataCache[playerId] = {}; // Create new player data if not exists
    }

    const player = playerDataCache[playerId];
    if (!player.pokedex) {
        player.pokedex = [];
    }

    if (!player.pokedex.includes(pokemonId)) {
        player.pokedex.push(pokemonId);
    }

    return res.status(200).send('Pokémon added to Pokédex.');
});

// API route to add unlocked route
app.post('/api/player/:playerId/routes', (req, res) => {
    const { playerId } = req.params;
    const { route } = req.body;

    if (!route) {
        return res.status(400).send('Route is required.');
    }

    if (!playerDataCache[playerId]) {
        playerDataCache[playerId] = {}; // Create new player data if not exists
    }

    const player = playerDataCache[playerId];
    if (!player.unlockedRoutes) {
        player.unlockedRoutes = [];
    }

    if (!player.unlockedRoutes.includes(route)) {
        player.unlockedRoutes.push(route);
    }

    return res.status(200).send('Route unlocked.');
});

// Start the server and preload data
app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    await preloadPokemonData(); // Preload all Pokémon data into memory
});
