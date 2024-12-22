export default class BagScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Bag' });
    }

    preload() {
        // Preload assets if needed
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#808080'); // Grey background

        // Add placeholder text
        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            'Bag',
            { font: '32px Arial', color: '#ffffff' }
        ).setOrigin(0.5, 0.5);

        // Add a back button for navigation
        const backButton = this.add.text(
            20,
            20,
            'Back',
            { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333' }
        )
        .setPadding(10)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('MainMenu'); // Change to your main menu or another scene
        });
    }

    update() {
        // Add any updates needed
    }
}