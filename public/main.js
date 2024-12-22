import MainMenu from './scenes/mainmenu.js';
import GameScene from './scenes/game.js';
import StarterSelection from './scenes/starterSelection.js';
import BagScene from './scenes/bag.js';
import MapScene from './scenes/map.js';
import PokedexScene from './scenes/pokedex.js';
import TrainerScene from './scenes/trainer.js';
import Route1Scene from './scenes/locations/kanto/route1.js';

const gameScenes = [MainMenu, GameScene, StarterSelection, BagScene, MapScene,
    TrainerScene, PokedexScene, Route1Scene
];



const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: gameScenes,
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
