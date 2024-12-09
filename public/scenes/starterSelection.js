import { addPokemonToPlayerTeam } from '../helpers/pokemonhelpers.js';
import BaseScene from './base.js';

export default class StarterSelection extends BaseScene {
    constructor() {
        super('StarterSelection');
    }

    preload() {
        // Preload starter Pokémon icons
        this.load.image('bulbasaur', 'path_to_bulbasaur_icon.png');
        this.load.image('charmander', 'path_to_charmander_icon.png');
        this.load.image('squirtle', 'path_to_squirtle_icon.png');
    }

    create() {
        super.create
        const { width, height } = this.scale;

        // Title Text
        this.add.text(width / 2, 50, 'Choose Your Starter Pokémon', {
            font: '24px Arial',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Starter Pokémon data
        const starters = [
            { name: 'bulbasaur', displayName: 'Bulbasaur' },
            { name: 'charmander', displayName: 'Charmander' },
            { name: 'squirtle', displayName: 'Squirtle' },
        ];

        const startY = height / 2 - (starters.length * 40) / 2; // Vertically center text

        // Display Starter Pokémon as text options
        starters.forEach((starter, index) => {
            const y = startY + index * 40;

            const text = this.add.text(width / 2, y, starter.displayName, {
                font: '20px Arial',
                color: '#ffffff',
            }).setOrigin(0.5);

            // Add hover effect
            text.setInteractive({ useHandCursor: true })
                .on('pointerover', () => text.setStyle({ color: '#ffff00' })) // Highlight on hover
                .on('pointerout', () => text.setStyle({ color: '#ffffff' })) // Reset on out
                .on('pointerdown', () => {
                    this.chooseStarter(starter.name);
                });
        });
    }

    chooseStarter(starterName) {
        console.log(`Starter chosen: ${starterName}`);
        // Add to player's team
        addPokemonToPlayerTeam(starterName);
        this.scene.start('GameScene'); // Redirect to game
    }
}
