export default class PokedexScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Pokedex' });
    }

    create() {
        // Set a gray background
        this.cameras.main.setBackgroundColor('#808080');

        // Add a title text
        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 - 50,
            'Pokedex',
            { font: '32px Arial', fill: '#ffffff' }
        ).setOrigin(0.5);

        // Add a back button
        const backButton = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 50,
            'Back to Menu',
            { font: '24px Arial', fill: '#ffffff' }
        ).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}