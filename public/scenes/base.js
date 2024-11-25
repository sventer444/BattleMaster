export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);

        // Store reusable game objects or UI components
        this.additionalGameObjects = [];
    }

    create() {
        // Attach a global resize handler
        this.scale.on('resize', this.resizeElements, this);
    }

    resizeElements() {
        const { width, height } = this.scale;

        // Resize and reposition the background
        if (this.bg) {
            this.resizeBackground(width, height);
        }

        // Resize any additional game objects (e.g., text, images, etc.)
        this.resizeGameObjects(width, height);
    }

    resizeBackground(width, height) {
        // Ensure the background is always scaled to the screen size
        this.bg.setDisplaySize(width, height); 
        this.bg.setPosition(width / 2, height / 2); // Center the background
    }

    resizeGameObjects(width, height) {
        this.additionalGameObjects.forEach((obj) => {
            if (!obj || !obj.scene) return;

            // Resize text objects
            if (obj.setFontSize) {
                obj.setFontSize(`${Math.min(width, height) * 0.04}px`);
                obj.setPosition(width / 2, height / 2); // Adjust position as needed
            }

            // Resize images or other objects with setDisplaySize
            else if (obj.setDisplaySize) {
                obj.setDisplaySize(width * 0.6, height * 0.1); // Adjust size for buttons or other UI
                obj.setPosition(width / 2, height / 2); // Adjust position as needed
            }
        });
    }

    shutdown() {
        // Remove resize listener
        this.scale.off('resize', this.resizeElements, this);

        // Cleanup common game objects
        this.cleanupObjects();

        super.shutdown();
    }

    cleanupObjects() {
        // Destroy background
        if (this.bg) {
            this.bg.destroy();
            this.bg = null;
        }

        // Destroy additional game objects
        this.additionalGameObjects.forEach((obj) => {
            if (obj) obj.destroy();
        });

        this.additionalGameObjects = [];
    }

    destroy() {
        // Ensure cleanup and destruction
        this.shutdown();
        super.destroy();
    }
}
