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

    // Text style for enemy details
    const textStyle = {
        font: '18px Arial',
        color: '#ffffff',
    };

    // Display enemy name and level
    scene.enemyNameText = scene.add.text(
        10,  // Left-aligned with a small margin
        topBarHeight / 2,
        'Enemy: ??? (Lv. ??)', // Placeholder for enemy name and level
        textStyle
    ).setOrigin(0, 0.5); // Left alignment, vertically centered

    // Placeholder for health bar
    const healthBarWidth = 200;
    const healthBarHeight = 16;
    const healthBarX = (width / 2) - (healthBarWidth / 2); // Centered horizontally
    const healthBarY = (topBarHeight / 2) - (healthBarHeight / 2); // Centered vertically
    scene.healthBarBg = scene.add.graphics();
    scene.healthBarBg.fillStyle(0x555555, 1); // Grey background
    scene.healthBarBg.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    scene.healthBar = scene.add.graphics();
    scene.healthBar.fillStyle(0xff0000, 1); // Red health
    scene.healthBar.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Placeholder for caught icon
    const iconSize = 32;
    scene.caughtIcon = scene.add.text(
        width - 40, // Right-aligned with a margin
        topBarHeight / 2,
        '⚪', // Placeholder icon (can replace with a sprite later)
        { font: '24px Arial', color: '#ffffff' }
    ).setOrigin(0.5, 0.5); // Centered around its position

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
