import BaseScene from './base.js';
import { setupBackground, setupBars, setupNavButtons } from '../ui/uisetup.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('GameScene');
        this.playerTeam = [];
        this.enemy = null;
    }

    preload() {
        try {
            this.loadGameData(); // Preload enemy and player Pokémon data
        } catch (error) {
            console.error('Error during preload:', error);
        }
    }

    create() {
        super.create();

        const { width, height } = this.scale;

        // Clear the player team before adding new Pokémon
        this.playerTeam = []; // Clear the existing team

        // Set up the background, bars, and navigation buttons
        this.background = setupBackground(this, width, height);
        this.topBarHeight = 50;
        this.bottomBarHeight = 80;
        setupBars(this, width, height, this.topBarHeight, this.bottomBarHeight);

        this.navButtons = setupNavButtons(this, width, height, this.bottomBarHeight, () => this.scene.start('MainMenu'));

        // Calculate game area sizes
        this.gameAreaHeight = height - this.topBarHeight - this.bottomBarHeight;
        this.topContainerHeight = this.gameAreaHeight / 2;
        this.bottomContainerHeight = this.gameAreaHeight / 2;

        // Enemy and Team Containers
        this.topContainer = this.add.container(0, this.topBarHeight);
        this.bottomContainer = this.add.container(0, this.topBarHeight + this.topContainerHeight);

        // Display the loaded Pokémon
        this.displayGameData();
    }

    async fetchPokemon(query) {
        try {
            const response = await fetch(`/api/pokemon?${query}`);
            if (!response.ok) {
                console.error(`Failed to fetch Pokémon. Status: ${response.status}, Query: ${query}`);
                return null;
            }
    
            const data = await response.json();
            if (data.length > 0) return data[0]; // Return the first Pokémon
            console.warn(`No data returned for query: ${query}`);
            return null;
        } catch (error) {
            console.error(`Error fetching Pokémon data for query: ${query}`, error);
            return null;
        }
    }

    async loadGameData() {
        try {
            // Preload enemy sprite
            this.enemy = await this.fetchPokemon('name=pikachu');
            if (this.enemy && this.enemy.sprite) {
                this.load.image('enemySprite', this.enemy.sprite); // Load enemy sprite
            } else {
                console.error('Failed to preload enemy Pokémon sprite.');
            }
    
            // Preload player sprite
            const playerPokemon = await this.fetchPokemon('name=bulbasaur');
            if (playerPokemon && playerPokemon.icon) {
                this.playerTeam.push(playerPokemon); // Add to player team
                this.load.image('playerSprite', playerPokemon.icon); // Load player sprite
            } else {
                console.error('Failed to preload player Pokémon sprite.');
            }
    
            // Wait for all assets to load
            this.load.once('complete', () => {
                console.log('All assets loaded.');
                this.displayGameData(); // Proceed to display data after loading
            });
    
            this.load.start(); // Start loading all images
    
        } catch (error) {
            console.error('Error loading game data:', error);
        }
    }

    displayGameData() {
        this.displayEnemy();
        this.displayPlayerTeam();
    }

    displayEnemy() {
        if (!this.enemy) {
            console.error('Enemy Pokémon is not loaded.');
            return;
        }

        const { width } = this.scale;
        this.enemySprite = this.add.image(width / 2, this.topContainerHeight / 2, 'enemySprite')
            .setOrigin(0.5)
            .setDisplaySize(96, 96);
        this.topContainer.add(this.enemySprite);
    }

    displayPlayerTeam() {
        if (this.playerTeam.length === 0) {
            console.error('Player team is empty.');
            return;
        }

        const { width } = this.scale;
        const teamSize = this.playerTeam.length;

        // Calculate the total width needed for all sprites
        const totalWidth = 96 * teamSize + (teamSize - 1) * 20; // Increased to 96px per sprite

        // Calculate the starting position so the team is centered
        const startX = (width - totalWidth) / 2;

        // Loop through the player's team and display each Pokémon
        this.playerTeam.forEach((pokemon, index) => {
            const slotX = startX + index * (96 + 20); // 96px sprite width + 20px spacing

            // Display the Pokémon sprite with increased size
            const sprite = this.add.image(slotX, this.bottomContainerHeight / 2, 'playerSprite')
                .setOrigin(0.5)
                .setDisplaySize(96, 96); // Increased size
            this.bottomContainer.add(sprite);

            // Display the Pokémon name below the sprite
            const capitalizedName = this.capitalizeName(pokemon.name);  // Capitalize the name
            const text = this.add.text(slotX, this.bottomContainerHeight / 2 + 60, capitalizedName, { // Adjusted vertical position
                font: '20px Arial',
                fill: '#ffffff',
            }).setOrigin(0.5);
            this.bottomContainer.add(text);
        });
    }

    capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
}
