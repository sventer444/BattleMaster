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
    
            // Preload player sprite (just one Pokémon for now)
            const playerPokemon = await this.fetchPokemon('name=bulbasaur');
            if (playerPokemon && playerPokemon.icon) {
                this.playerTeam.push(playerPokemon); // Add to player team
                this.load.image(playerPokemon.name, playerPokemon.icon); // Load the unique sprite for this Pokémon
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
        const maxSlots = 6;
        const teamSize = this.playerTeam.length;
    
        // Clear existing team display
        this.bottomContainer.removeAll(true);
    
        const slotSpacing = 20;
        const slotWidth = 96;
        const totalWidth = slotWidth * maxSlots + (maxSlots - 1) * slotSpacing;
        const startX = (width - totalWidth) / 2;
    
        for (let i = 0; i < teamSize; i++) {
            const slotX = startX + i * (slotWidth + slotSpacing);
            const pokemon = this.playerTeam[i];
    
            // Use name as texture key
            const sprite = this.add.image(slotX, this.bottomContainerHeight / 2, pokemon.name)
                .setOrigin(0.5)
                .setDisplaySize(slotWidth, slotWidth);
            this.bottomContainer.add(sprite);
    
            const capitalizedName = this.capitalizeName(pokemon.name);
            const text = this.add.text(slotX, this.bottomContainerHeight / 2 + 60, capitalizedName, {
                font: '20px Arial',
                fill: '#ffffff',
            }).setOrigin(0.5);
            this.bottomContainer.add(text);
        }
    }
    
    capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
}
