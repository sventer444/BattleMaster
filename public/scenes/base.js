export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        // Store reusable game objects or UI components
        this.additionalGameObjects = [];
        this.loadingCircle = null;
    }

    create() {
        // Attach a global resize handler
        this.scale.on('resize', this.resizeElements, this);
        
        // Show loading spinner when the scene starts
        this.showLoadingCircle();

        // Simulate loading process (you can remove this in real use case)
        this.time.delayedCall(2000, this.hideLoadingCircle, [], this);
    }

    showLoadingCircle() {
        const { width, height } = this.scale;

        // Create a circle graphics object for the loading spinner
        this.loadingCircle = this.add.graphics();
        this.loadingCircle.lineStyle(4, 0xffffff, 1); // White circle
        this.loadingCircle.beginPath();
        this.loadingCircle.arc(width / 2, height / 2, 50, 0, Math.PI * 2, false);
        this.loadingCircle.closePath();
        this.loadingCircle.strokePath();

        // Create a rotating animation for the loading spinner
        this.tweens.add({
            targets: this.loadingCircle,
            angle: 360,
            duration: 1500,
            repeat: -1, // Infinite rotation
            ease: 'Linear'
        });
    }

    hideLoadingCircle() {
        if (this.loadingCircle) {
            this.loadingCircle.setAlpha(0); // Fade out the loading circle
            this.time.delayedCall(500, () => this.loadingCircle.destroy(), [], this);
        }
    }

    resizeElements() {
        const { width, height } = this.scale;

        // Resize and reposition the background
        if (this.bg) {
            this.resizeBackground(width, height);
        }

        // Resize any additional game objects (e.g., text, images, buttons)
        this.resizeGameObjects(width, height);
    }

    resizeBackground(width, height) {
        // Resize the background to fill the screen
        this.bg.setDisplaySize(width, height);
        this.bg.setPosition(width / 2, height / 2);
    }

    resizeGameObjects(width, height) {
        // Resize and reposition buttons based on new screen size
        this.additionalGameObjects.forEach((obj) => {
            if (obj && obj.setPosition) {
                // Keep button width fixed (no scaling) but adjust the height and position
                obj.setPosition(width / 2, obj.y);  // Keep horizontal position fixed
                // Adjust vertical position relative to height
                obj.setPosition(obj.x, obj.originalY * (height / this.originalHeight)); // Maintain vertical spacing based on original height
            }
        });
    }

    shutdown() {
        // Remove resize listener
        this.scale.off('resize', this.resizeElements, this);

        // Clean up game objects
        this.cleanupObjects();

        super.shutdown();
    }

    cleanupObjects() {
        // Destroy background
        if (this.bg) {
            this.bg.destroy();
            this.bg = null;
        }

        // Destroy any other game objects
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
