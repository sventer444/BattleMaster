import BaseScene from './base.js';
import { setupBackground, setupBars, setupNavButtons } from '../ui/uisetup.js';
import { loadPokemon, preloadPokemonSprite } from '../helpers/pokemonhelpers.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('GameScene');
        this.playerTeam = [];
        this.enemy = null;
    }

    
    preload() {
        // Preload assets and fetch enemy Pokémon
        this.loadEnemyPokemon();
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

        // Load dynamic assets and display content
        this.loadGameData();
    }

    async loadGameData() {
        await this.loadEnemyPokemon();
        await this.loadStartingPokemon();
        this.displayEnemy(); // Display after everything is loaded
    }

    async loadEnemyPokemon() {
        // Fetch Pikachu specifically
        this.enemy = await loadPokemon('/api/pokemon?name=pikachu'); // Adjust API query as necessary
    
        if (this.enemy && this.enemy.sprite) {
            await preloadPokemonSprite(this, this.enemy.sprite, 'enemySprite');
        } else {
            console.error('Failed to load Pikachu or its sprite.');
        }
    }
    

    async loadStartingPokemon() {
        const startingPokemon = await loadPokemon('/api/pokemon?limit=1');
        if (startingPokemon) {
            this.playerTeam.push(startingPokemon);

            // Display the Pokémon's name in the team area
            const { width } = this.scale;
            const slotSpacing = width / 6;

            this.teamSlots = [
                this.add.text(slotSpacing / 2, this.bottomContainerHeight / 2, startingPokemon.name, {
                    font: '24px Arial',
                    fill: '#ffffff',
                }).setOrigin(0.5),
            ];

            this.teamSlots.forEach(slot => this.bottomContainer.add(slot));
        }
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
}
