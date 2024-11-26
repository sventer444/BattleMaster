import BaseScene from './base.js';
import { createPokeball, createPokemonButton } from '../ui/pokemonHelpers.js'; // Assuming you have helper functions for UI

export default class GameScene extends BaseScene {
    constructor() {
        super('GameScene');
    }
    preload() {
        // Load sprite sheet for battle backgrounds
        this.load.spritesheet('battleBackground', 'assets/battlebg.png', {
            frameWidth: 800, // adjust width of each background slice
            frameHeight: 600, // adjust height of each background slice
        });
        // Fetch the list of icons from the server
        fetch('/iconList')
            .then(response => response.json())
            .then(iconList => {
                iconList.forEach((filename) => {
                    const iconName = filename.replace('.png', ''); // Strip the extension for the key
                    console.log('icon name', iconName);
                    this.load.image(iconName, `assets/BigIcons/${filename}`);
                });
            });
    }
    
    create() {
        super.create();

        // Set up the game scene background
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'battleBackground').setDisplaySize(width, height);

        // Example: Display one icon
        this.add.image(100, 100, 'pm0001_00_00_00_big').setScale(1);

        const playerTeam = [
            { name: 'Pikachu', position: { x: width / 6, y: height - 50 } },
            { name: 'Bulbasaur', position: { x: width / 6 * 2, y: height - 50 } },
            { name: 'Charmander', position: { x: width / 6 * 3, y: height - 50 } },
            { name: 'Squirtle', position: { x: width / 6 * 4, y: height - 50 } },
            { name: 'Jigglypuff', position: { x: width / 6 * 5, y: height - 50 } },
            { name: 'Meowth', position: { x: width / 6 * 6, y: height - 50 } },
        ];
    
        playerTeam.forEach(pokemon => {
            let pokemonText = this.add.text(pokemon.position.x, pokemon.position.y, pokemon.name, {
                font: '16px Arial',
                fill: '#ffffff',
            }).setOrigin(0.5);
    
            // Enable drag for each Pokémon name text
            pokemonText.setInteractive();
            this.input.setDraggable(pokemonText);
    
            // Drag events
            pokemonText.on('drag', (pointer, dragX, dragY) => {
                pokemonText.setPosition(dragX, dragY);
            });
        });

        // // Create a placeholder for the wild Pokémon to fight
        // this.wildPokemon = this.createWildPokemon(width, height);

        // // Create a "Fight" button to initiate the battle (for now just logs the event)
        // this.fightButton = this.add.text(width / 2, height - 100, 'Fight', { fontSize: '24px', fill: '#ffffff' })
        //     .setOrigin(0.5)
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //         console.log('Battle Started!');
        //         this.startBattle(); // This will handle the battle logic
        //     });
    }
    
    createTeamButtons(width, height) {
        this.teamButtons = [];
        const pokemonImages = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'eevee', 'jigglypuff']; // Example

        pokemonImages.forEach((pokemon, index) => {
            const button = createPokemonButton(this, width / 6 * (index + 1), height - 60, pokemon, this.selectPokemon, width, height);
            this.teamButtons.push(button);
        });
    }

    selectPokemon(pokemonName) {
        console.log(`${pokemonName} selected for battle!`);
        // Logic for adding the Pokémon to the player's active team
    }

    createWildPokemon(width, height) {
        const wildPokemon = this.add.image(width / 2, height / 2 - 100, 'wildPokemon'); // Example placeholder
        wildPokemon.setDisplaySize(200, 200);
        return wildPokemon;
    }

    startBattle() {
        // Placeholder function to initiate the battle logic
        console.log('Initiating Battle...');
        // Transition to a battle scene or implement battle mechanics here
    }

    shutdown() {
        super.shutdown();

        // Clean up any game-specific objects, like Pokémon buttons or the battle UI
        this.teamButtons.forEach(button => button.destroy());
        this.fightButton.destroy();
    }
}
