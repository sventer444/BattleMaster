export function createPokemonButton(scene, x, y, pokemonName, onSelect, width, height) {
    const button = scene.add.text(x, y, pokemonName, {
        fontSize: '20px',
        color: '#ffcc00',
    })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => onSelect(pokemonName)); // On click, select the Pokémon

    // Optional: make the button draggable (for on-the-fly team building)
    button.setDraggable(true);
    button.on('drag', (pointer, dragX, dragY) => {
        button.x = dragX;
        button.y = dragY;
    });

    return button;
}

export function createPokeball(scene, x, y) {
    const pokeball = scene.add.image(x, y, 'pokeball')
        .setDisplaySize(40, 40)
        .setInteractive();
    
    // You can add animations or interactions here (e.g., throwing a Pokéball)
    return pokeball;
}
