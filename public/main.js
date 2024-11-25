import Phaser from "phaser";

class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    preload() {
        // Load assets
        this.load.image("background", "assets/background.jpg"); // Add a background asset
    }

    create() {
        // Display background
        this.add.image(400, 300, "background").setScale(0.5);

        // Add text
        this.add.text(400, 200, "Pokémon Game", {
            fontSize: "32px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Add a start button
        const startButton = this.add.text(400, 300, "Start", {
            fontSize: "24px",
            color: "#ffcc00",
        }).setOrigin(0.5).setInteractive();

        startButton.on("pointerdown", () => {
            console.log("Game Started!");
            this.scene.start("GameScene"); // Replace with your actual game scene
        });
    }
}

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainMenu],
    parent: "game-container",
};

const game = new Phaser.Game(config);
