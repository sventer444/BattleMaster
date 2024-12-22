import BaseScene from './base.js';
import UIManager from '../ui/uimanager.js'; // Import the UIManager
import { getPlayerTeam } from '../helpers/pokemonhelpers.js';

export default class MainMenu extends BaseScene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        const { width, height } = this.scale;

        // Add a progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
        });

        // Load assets
        this.load.image('background', '../assets/background.jpg');
    }

    create() {
        super.create();

        const { width, height } = this.scale;

        // Store original height for resizing logic
        this.originalHeight = height;

        // Add and scale the background
        this.bg = this.add.image(width / 2, height / 2, 'background');
        this.bg.setDisplaySize(width, height);

        // Define starting position for the first button
        let startY = height / 2 - 50;

        // Create the Play button
        this.playButton = UIManager.createButton(this, width / 2, startY, 'Play', () => {
            startGame(this);
        }, width, height);
        this.playButton.originalY = startY; // Store original Y for resizing

        // Create the Pokedex button with a vertical offset from the Play button
        this.pokedexButton = UIManager.createButton(this, width / 2, startY + 60, 'Pokedex', () => {
            this.scene.start('Pokedex');
        }, width, height);
        this.pokedexButton.originalY = startY + 60;

        // Create the Trainer button with a vertical offset from the Pokedex button
        this.trainerButton = UIManager.createButton(this, width / 2, startY + 120, 'Trainer', () => {
            this.scene.start('Trainer');
        }, width, height);
        this.trainerButton.originalY = startY + 120;

        // Add buttons to the array for cleanup
        this.additionalGameObjects = [this.playButton, this.pokedexButton, this.trainerButton];
    }

    shutdown() {
        super.shutdown();

        // Clean up dynamically created objects
        if (this.additionalGameObjects) {
            this.additionalGameObjects.forEach((obj) => obj.destroy());
        }
        this.additionalGameObjects = null;
    }
}

function startGame(scene) {

    if (getPlayerTeam().length === 0) {
        // Redirect to StarterSelection if no starter chosen
        scene.scene.start('StarterSelection');
    } else {
        // Start GameScene directly if starter exists
        scene.scene.start('KantoRoute1');
    }
}