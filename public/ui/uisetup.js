export function setupBackground(scene, width, height) {
    const background = scene.add.graphics();
    background.fillStyle(0x37474f, 1);
    background.fillRect(0, 0, width, height);
    return background;
}

export function setupBars(scene, width, height, topBarHeight, bottomBarHeight) {
    // Create the top and bottom bars
    const topBar = scene.add.graphics();
    topBar.fillStyle(0x212121, 1);
    topBar.fillRect(0, 0, width, topBarHeight);

    const bottomBar = scene.add.graphics();
    bottomBar.fillStyle(0x212121, 1);
    bottomBar.fillRect(0, height - bottomBarHeight, width, bottomBarHeight);

    // Example multipliers (6 numbers with different colors)
    const multiplierColors = [0xff5722, 0x4caf50, 0x2196f3, 0xffeb3b, 0x9c27b0, 0xe91e63];
    const multipliers = [1.1, 2.5, 3.0, 1.8, 2.2, 4.0];

    const textStyle = {
        font: '20px Arial',
        color: '#ffffff',
    };

    const spacing = width / multipliers.length; // Even spacing for the numbers

    // Display multipliers
    multipliers.forEach((value, index) => {
        scene.add.text(
            spacing * index + spacing / 2,  // X position
            topBarHeight / 2,               // Y position
            value.toFixed(1),               // Text content
            {
                ...textStyle,
                color: `#${multiplierColors[index].toString(16)}`,  // Dynamic color based on the index
            }
        ).setOrigin(0.5);
    });

    return { topBar, bottomBar };
}

export function setupNavButtons(scene, width, height, bottomBarHeight, onRunCallback) {
    const navOptions = [
        { label: 'Fight', callback: () => console.log('Fight button clicked!') },
        { label: 'Map', callback: () => console.log('Map button clicked!') },
        { label: 'Bag', callback: () => console.log('Bag button clicked!') },
        { label: 'Run', callback: onRunCallback },
        { label: 'Dev', callback: () => addPokemonToPlayerTeam(scene) },  // Added Dev button
    ];

    const buttonSpacing = width / (navOptions.length + 1);
    const buttonStyle = { font: '22px Arial', fill: '#ffffff' };

    return navOptions.map((option, index) =>
        scene.add.text(buttonSpacing * (index + 1), height - bottomBarHeight / 2, option.label, buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', option.callback)
            .on('pointerover', function () { this.setStyle({ fill: '#ffcc00' }); })
            .on('pointerout', function () { this.setStyle({ fill: '#ffffff' }); })
    );
}

// Function to add a Pokémon to the player’s team, up to a max of 6
async function addPokemonToPlayerTeam(scene) {
    if (scene.playerTeam.length >= 6) {
        console.log('Player team is full.');
        return;
    }

    // Fetch the Pokémon data
    const newPokemon = await scene.fetchPokemon('name=charmander');
    if (newPokemon) {
        const spriteKey = newPokemon.name; // Use Pokémon name as key
        scene.load.image(spriteKey, newPokemon.icon); // Load sprite with name as key

        scene.playerTeam.push(newPokemon); // Add Pokémon to the team
        console.log(`Added ${newPokemon.name} to player team.`);

        // Ensure sprite is displayed after loading
        scene.load.once('complete', () => {
            scene.displayPlayerTeam(); // Update the display
        });
        scene.load.start(); // Start the loading process
    } else {
        console.error('Failed to add new Pokémon to team.');
    }
}
