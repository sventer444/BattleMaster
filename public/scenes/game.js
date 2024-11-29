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
    
        // Initialize a container for the top bar text
        this.topBarTextContainer = this.add.container(0, 0);
    
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
    
    createHealthBar(width) {
        const healthBarWidth = 200;
        const healthBarHeight = 16;
        const healthBarX = (width / 2) - (healthBarWidth / 2);
        const healthBarY = this.topBarHeight / 2 - healthBarHeight / 2;

        this.healthBarBg = this.add.graphics()
            .fillStyle(0x555555, 1)
            .fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        this.healthBar = this.add.graphics()
            .fillStyle(0xff0000, 1)
            .fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    }

    createCaughtIcon(width) {
        this.caughtIcon = this.add.text(
            width - 40,
            this.topBarHeight / 2,
            '⚪',
            { font: '24px Arial', color: '#ffffff' }
        ).setOrigin(0.5, 0.5);
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
                // Ensure the enemy has both a name and level
                this.enemy.level = this.enemy.level || 1; // Default to level 1 if not available
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

        // Update enemy name and level
        if (this.enemy) {
            this.updateEnemyInfo(this.enemy.name, this.enemy.level);
        }
    }

    displayEnemy() {
        if (!this.enemy) {
            console.error('Enemy Pokémon is not loaded.');
            return;
        }
    
        console.log('Enemy Data:', this.enemy);  // Debugging line
    
        const { width } = this.scale;
        
        // Check if enemy sprite is already created
        if (!this.enemySprite) {
            this.enemySprite = this.add.image(width / 2, this.topContainerHeight / 2, 'enemySprite')
                .setOrigin(0.5)
                .setDisplaySize(96, 96);
            this.topContainer.add(this.enemySprite);
        }
    
        // Ensure the enemy has the expected structure
        if (this.enemy.name && this.enemy.level) {
            this.updateEnemyInfo(this.enemy.name, this.enemy.level);
        } else {
            console.error('Enemy does not have valid name or level:', this.enemy);
        }
    }    
    
    displayPlayerTeam() {
        if (this.playerTeam.length === 0) {
            console.error('Player team is empty.');
            return;
        }

        const { width } = this.scale;
        const teamSize = this.playerTeam.length;

        this.bottomContainer.removeAll(true);

        const availableWidth = width * 0.8;
        const spriteSize = Math.min(96, availableWidth / teamSize - 10);
        const totalWidth = spriteSize * teamSize + (teamSize - 1) * 10;
        const startX = (width - totalWidth) / 2;

        for (let i = 0; i < teamSize; i++) {
            const slotX = startX + i * (spriteSize + 50);
            const pokemon = this.playerTeam[i];

            const sprite = this.add.image(slotX, this.bottomContainerHeight / 2, pokemon.name)
                .setOrigin(0.5)
                .setDisplaySize(spriteSize, spriteSize);
            this.bottomContainer.add(sprite);

            const capitalizedName = this.capitalizeName(pokemon.name);
            const text = this.add.text(slotX, this.bottomContainerHeight / 2 + spriteSize / 2 + 10, capitalizedName, {
                font: '16px Arial',
                fill: '#ffffff',
            }).setOrigin(0.5);
            this.bottomContainer.add(text);
        }
    }
    
    updateEnemyInfo(name, level) {
        if (!name || !level) {
            console.error('Invalid enemy data:', name, level);
            return;
        }
    
        const { width } = this.scale;
    
        // Check if the text objects already exist and create them if they don't
        if (!this.enemyNameText) {
            this.enemyNameText = this.add.text(width / 2, this.topContainerHeight / 2 + 60, name, {
                font: '20px Arial',
                fill: '#ffffff',
            }).setOrigin(0.5);
        } else {
            // If text exists, update it
            this.enemyNameText.setText(name);
        }
    
        // Check if the enemy level text object already exists
        if (!this.enemyLevelText) {
            this.enemyLevelText = this.add.text(width / 2, this.topContainerHeight / 2 + 90, `Lv. ${level}`, {
                font: '18px Arial',
                fill: '#ffffff',
            }).setOrigin(0.5);
        } else {
            // If text exists, update it
            this.enemyLevelText.setText(`Lv. ${level}`);
        }
    }
    
    updateHealthBar(percentage) {
        const healthBarWidth = 200;
        const newWidth = healthBarWidth * percentage;
        this.healthBar.clear()
            .fillStyle(0xff0000, 1)
            .fillRect(
                (this.scale.width / 2) - (healthBarWidth / 2),
                (this.topBarHeight / 2) - (16 / 2),
                newWidth,
                16
            );
    }

    updateCaughtIcon(caught) {
        this.caughtIcon.setText(caught ? '✔️' : '⚪');
    }

    capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
}
