import MainMenu from './scenes/mainmenu.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container', // Attach Phaser to the container div
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Default gravity; can override per object
            debug: true, // Enable debug mode for visualizing physics
        },
    },
    scale: {
        mode: Phaser.Scale.RESIZE,  // Ensures the game canvas resizes with the window
        autoCenter: Phaser.Scale.CENTER_BOTH,  // Centers the game canvas during resize
    },
    scene: [MainMenu],  // Add your scenes here
};

const game = new Phaser.Game(config);
