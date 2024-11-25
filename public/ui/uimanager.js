export default class UIManager {
    /**
     * Creates a button with text and click functionality.
     * @param {Phaser.Scene} scene - The scene where the button is created.
     * @param {number} x - The x-coordinate of the button.
     * @param {number} y - The y-coordinate of the button.
     * @param {string} text - The text displayed on the button.
     * @param {Function} callback - The function to call when the button is clicked.
     * @param {number} screenWidth - The width of the game screen.
     * @param {number} screenHeight - The height of the game screen.
     * @param {number} [verticalOffset=0] - Optional vertical offset for positioning multiple buttons.
     * @returns {Phaser.GameObjects.Text} The created button.
     */
    static createButton(scene, x, y, text, callback, screenWidth, screenHeight, verticalOffset = 0) {
        const buttonY = y + verticalOffset;

        // Create the button text
        const button = scene.add.text(x, buttonY, text, {
            fontSize: Math.min(screenWidth, screenHeight) * 0.03 + 'px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5,
            },
        })
            .setOrigin(0.5)
            .setInteractive();

        // Add pointer events
        button.on('pointerover', () => {
            button.setStyle({ backgroundColor: '#444444' });
        });
        button.on('pointerout', () => {
            button.setStyle({ backgroundColor: '#000000' });
        });
        button.on('pointerdown', () => {
            callback();
        });

        return button;
    }
}
