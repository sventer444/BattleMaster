import { fetchPokemon, addPokemonToPlayerTeam } from '../helpers/pokemonhelpers.js';
import BaseScene from './base.js';

export default class StarterSelection extends BaseScene {
    constructor() {
        super('StarterSelection');
        this.starters = ['bulbasaur', 'charmander', 'squirtle']; // Starter Pokémon names
    }

    async preload() {
        for (const name of this.starters) {
            const pokemon = await fetchPokemon(this, name, 5); // Fetch Pokémon data
            this.load.image(`${name}Sprite`, pokemon.sprite); // Dynamically preload the sprite
        }
    }
    

    create() {
        super.create();
        const { width, height } = this.scale;
        this.cameras.main.setBackgroundColor('#555555');
        this.add.text(width / 2, 50, 'Choose Your Starter Pokémon', {
            font: '24px Arial',
            color: '#ffffff',
        }).setOrigin(0.5);
    
        this.displayStarters(this, width, height);
    }
    

    displayStarters(scene, width, height) {
        if (!scene.starters || scene.starters.length === 0) {
            console.warn('Starter Pokémon are not loaded.');
            return;
        }
    
        const startX = width / 2 - (scene.starters.length * 120) / 2; // Adjust for spacing
        const startY = height / 2; // Vertically center the sprites
    
        // Destroy old sprites if they exist
        if (scene.starterSprites) {
            scene.starterSprites.forEach(sprite => sprite.destroy());
        }
        scene.starterSprites = [];
    
        scene.starters.forEach((name, index) => {
            const x = startX + index * 120;
    
            console.log(`Displaying starter sprite for ${name}...`);
            // Create and display the starter sprite
            const starterSprite = scene.add.image(x, startY, `${name}Sprite`)
                .setOrigin(0.5)
                .setDisplaySize(96, 96)
                .setAlpha(0) // Start with 0 alpha (invisible)
                .setScale(0.5); // Start with a smaller scale for the zoom-in effect
    
            // Tween for fade-in and scale-up effect
            scene.tweens.add({
                targets: starterSprite,
                alpha: 1, // Fade to full opacity
                scale: 1, // Scale to original size
                duration: 500, // Duration of the animation in ms
                ease: 'Power2', // Easing function for smooth animation
            });
    
            // Add hover and click interaction
            starterSprite.setInteractive();
            starterSprite.on('pointerdown', () => {
                scene.chooseStarter(name);
            });
            starterSprite.on('pointerover', () => {
                starterSprite.setScale(1.1); // Slightly enlarge on hover
            });
            starterSprite.on('pointerout', () => {
                starterSprite.setScale(1); // Reset size when not hovered
            });
    
            // Store the sprite for future reference
            scene.starterSprites.push(starterSprite);
    
            // Display Pokémon name below the sprite
            scene.add.text(x, startY + 70, name, {
                font: '18px Arial',
                color: '#ffffff',
            }).setOrigin(0.5);
        });
    }

    async chooseStarter(starterName) {
        try {
            const playerId = 'player123'; // Replace with actual player ID

            // Send team data to the server
            await fetch(`/api/player/${playerId}/team`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ team: [starterName] }),
            });

            // Send Pokedex data to the server
            await fetch(`/api/player/${playerId}/pokedex`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pokemonId: starterName }),
            });

            // Send route data to the server
            await fetch(`/api/player/${playerId}/routes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ route: 'KantoRoute1' }),
            });

            console.log('Player data updated on the server.');

            // Add to player's team
            await addPokemonToPlayerTeam(this, starterName);

            // Redirect to the next scene
            this.scene.start('KantoRoute1');
        } catch (error) {
            console.error('Error updating player data:', error);
        }
    }
}
