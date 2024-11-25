import BaseScene from './base.js';
import UIManager from '../ui/uimanager.js'; // Import the UIManager

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

        // Add and scale the background
        this.bg = this.add.image(width / 2, height / 2, 'background');
        this.bg.setDisplaySize(width, height);

        // Define starting position for the first button
        let startY = height / 2 - 50; // Adjust as needed

        // Create the Play button
        this.playButton = UIManager.createButton(this, width / 2, startY, 'Play', () => {
            this.scene.stop('MainMenu');
            this.scene.start('GameScene');
        }, width, height);

        // Create the Pokedex button with a vertical offset from the Play button
        this.pokedexButton = UIManager.createButton(this, width / 2, startY, 'Pokedex', () => {
            console.log('Pokedex button clicked!');
            // Add logic to navigate to the Pokedex scene
        }, width, height, 60); // 60 is the vertical offset

        // Create the Trainer button with a vertical offset from the Pokedex button
        this.trainerButton = UIManager.createButton(this, width / 2, startY, 'Trainer', () => {
            console.log('Trainer button clicked!');
            // Add logic for opening the Trainer menu
        }, width, height, 120); // 120 is the vertical offset

        // Store buttons in an array for cleanup
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
