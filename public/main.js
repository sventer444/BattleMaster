import MainMenu from './scenes/mainmenu.js';
import GameScene from './scenes/game.js';
import StarterSelection from './scenes/starterSelection.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MainMenu, GameScene, StarterSelection],
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false, // Disable physics debug for production
        },
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const game = new Phaser.Game(config);
