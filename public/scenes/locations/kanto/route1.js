import GameScene from '../../game.js';
import { displayEnemy } from '../../../ui/uisetup.js';
import { getPokemonByEncounterRate } from '../../../../helpers/pokemonhelpers.js'; // A utility to fetch a random Pokémon

export default class Route1Scene extends GameScene {
    constructor() {
        super('KantoRoute1');
        this.route1Pool = [
            { name: 'pidgey', rate: 50 },
            { name: 'rattata', rate: 50 },
        ]; // Define Route 1 Pokémon pool with encounter rates
    }

    async create() {
        super.create();
        const { width, height } = this.scale;

        // Select a Pokémon based on encounter rates
        const selectedPokemon = await getPokemonByEncounterRate(this, this.route1Pool);
        if (selectedPokemon) {
            super.enemy = selectedPokemon;

            // Display the selected Pokémon as the enemy
            displayEnemy(this, width, height);
        } else {
            console.warn('No Pokémon could be selected from the Route 1 pool.');
        }
    }
}
