import GameScene from '../../game.js';

export default class Route1Scene extends GameScene {
    constructor() {
        super('KantoRoute1');
        super.encounterPool = [
            { name: 'pidgey', rate: 60 },
            { name: 'rattata', rate: 35 },
            { name: 'caterpie', rate: 5 },
            { name: 'weedle', rate: 5 },
        ]; // Define Route 1 Pokémon pool with encounter rates
    }

    async create() {
        super.create();
    }
}
