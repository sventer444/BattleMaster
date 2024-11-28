import BaseScene from './base.js';
import Pokemon from '../helpers/pokemon.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('GameScene');
        this.playerTeam = []; // Array to hold the player's team
        this.enemy = null; // Enemy Pokémon object
    }

    async preload() {
        // Preload assets and fetch enemy Pokémon
        await this.loadEnemyPokemon(); 
    }

    async create() {
        super.create();

        const { width, height } = this.scale;

        // Background setup
        this.background = this.add.graphics();
        this.background.fillStyle(0x37474f, 1);
        this.background.fillRect(0, 0, width, height);

        // Top bar setup
        this.topBarHeight = 50;
        this.topBar = this.add.graphics();
        this.topBar.fillStyle(0x212121, 1);
        this.topBar.fillRect(0, 0, width, this.topBarHeight);

        // Bottom navigation bar setup
        this.bottomBarHeight = 80;
        this.bottomBar = this.add.graphics();
        this.bottomBar.fillStyle(0x212121, 1);
        this.bottomBar.fillRect(0, height - this.bottomBarHeight, width, this.bottomBarHeight);

        const navOptions = [
            { label: 'Fight', callback: () => console.log('Fight button clicked!') },
            { label: 'Map', callback: () => console.log('Map button clicked!') },
            { label: 'Bag', callback: () => console.log('Bag button clicked!') },
            { label: 'Run', callback: () => this.scene.start('MainMenu') },
        ];

        const buttonSpacing = width / (navOptions.length + 1);
        const buttonStyle = { font: '22px Arial', fill: '#ffffff' };
        this.navButtons = navOptions.map((option, index) =>
            this.add.text(buttonSpacing * (index + 1), height - this.bottomBarHeight / 2, option.label, buttonStyle)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', option.callback)
                .on('pointerover', function () { this.setStyle({ fill: '#ffcc00' }); })
                .on('pointerout', function () { this.setStyle({ fill: '#ffffff' }); })
        );

        // Game area setup
        this.gameAreaHeight = height - this.topBarHeight - this.bottomBarHeight;

        // Enemy area
        this.topContainerHeight = this.gameAreaHeight / 2;
        this.topContainer = this.add.container(0, this.topBarHeight);

        // Team area setup
        this.bottomContainerHeight = this.gameAreaHeight / 2;
        this.bottomContainer = this.add.container(0, this.topBarHeight + this.topContainerHeight);

        // Fetch and display the player's starting Pokémon
        await this.loadStartingPokemon();
        // Call this only after the enemy has been successfully loaded
        this.displayEnemy();
    }

    async loadEnemyPokemon() {
        try {
            const response = await fetch('/api/pokemon?limit=1'); // Fetch 1 Pokémon for the enemy
            const [enemyData] = await response.json(); // Assume only 1 Pokémon is returned

            // Preload the enemy sprite
            this.load.image('enemySprite', enemyData.sprite);

            // Create the enemy Pokémon object
            this.enemy = new Pokemon(enemyData);

            // Start preloading and ensure it's complete before proceeding
            await new Promise(resolve => {
                this.load.once('complete', resolve);
                this.load.start();
            });
        } catch (error) {
            console.error('Error loading enemy Pokémon:', error);
        }
    }

    async loadStartingPokemon() {
        try {
            const response = await fetch('/api/pokemon?limit=1'); // Request only 1 Pokémon for the player's team
            const [pokemonData] = await response.json(); // Assuming only 1 Pokémon is returned

            const startingPokemon = new Pokemon(pokemonData); // Create Pokémon object
            this.playerTeam.push(startingPokemon);

            // Display the Pokémon's name in the team area
            const { width } = this.scale;
            const slotSpacing = width / 6; // Placeholder for a team of 6 slots

            this.teamSlots = [
                this.add.text(slotSpacing / 2, this.bottomContainerHeight / 2, startingPokemon.name, {
                    font: '24px Arial',
                    fill: '#ffffff',
                }).setOrigin(0.5),
            ];

            // Add the text to the bottom container
            this.teamSlots.forEach(slot => this.bottomContainer.add(slot));
        } catch (error) {
            console.error('Error loading Pokémon:', error);
        }
    }

    displayEnemy() {
        if (!this.enemy) {
            console.error('Enemy Pokémon is not loaded.');
            return;
        }

        const { width } = this.scale;

        // Display the enemy sprite in the top container
        this.enemySprite = this.add.image(width / 2, this.topContainerHeight / 2, 'enemySprite')
            .setOrigin(0.5)
            .setDisplaySize(96, 96);

        this.topContainer.add(this.enemySprite);
    }

    resizeGame(gameSize) {
        const { width, height } = gameSize;

        // Adjust background
        this.background.clear();
        this.background.fillStyle(0x37474f, 1);
        this.background.fillRect(0, 0, width, height);

        // Adjust top bar
        this.topBar.clear();
        this.topBar.fillStyle(0x212121, 1);
        this.topBar.fillRect(0, 0, width, this.topBarHeight);

        // Adjust bottom bar
        this.bottomBar.clear();
        this.bottomBar.fillStyle(0x212121, 1);
        this.bottomBar.fillRect(0, height - this.bottomBarHeight, width, this.bottomBarHeight);

        // Adjust navigation buttons
        const buttonSpacing = width / (this.navButtons.length + 1);
        this.navButtons.forEach((button, index) => {
            button.setPosition(buttonSpacing * (index + 1), height - this.bottomBarHeight / 2);
        });

        // Adjust game area height
        this.gameAreaHeight = height - this.topBarHeight - this.bottomBarHeight;

        // Adjust enemy area
        this.topContainer.setPosition(0, this.topBarHeight);
        this.topContainerHeight = this.gameAreaHeight / 2;

        // Adjust team area
        this.bottomContainer.setPosition(0, this.topBarHeight + this.topContainerHeight);
        this.bottomContainerHeight = this.gameAreaHeight / 2;

        const slotSpacing = width / 6; // Assuming a team of 6 slots
        this.teamSlots.forEach((slot, index) => {
            slot.setPosition(slotSpacing * index + slotSpacing / 2, this.bottomContainerHeight / 2);
        });
    }
}
