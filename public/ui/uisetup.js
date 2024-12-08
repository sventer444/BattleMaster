const topGameBarHeight = 50;
const bottomGameBarHeight = 80;

export function initializeGameUI(scene, width, height){
    setBackground(scene, width, height);
    setGameBars(scene, width, height);
    overlayGameUI(scene, width, height);
}

function setBackground(scene, width, height) {
    const bg = scene.add.graphics();
    bg.fillStyle(0x37474f, 1);
    bg.fillRect(0, 0, width, height);
    scene.background = bg;
}

function setGameBars(scene, width, height) {
    // Create the top and bottom bars
    const topBar = scene.add.graphics();
    topBar.fillStyle(0x212121, 1);
    topBar.fillRect(0, 0, width, topGameBarHeight);

    const bottomBar = scene.add.graphics();
    bottomBar.fillStyle(0x212121, 1);
    bottomBar.fillRect(0, height - bottomGameBarHeight, width, bottomGameBarHeight);

}

function overlayGameUI(scene, width, height){
    displayNavButtons(scene, width, height);
    setGameContainers(scene, height);
    // displayEnemy(scene, width, height);
    // displayPlayerTeam(scene, width, height);
}

function displayNavButtons(scene, width, height) {
    const navOptions = [
        { label: 'Fight', callback: () => console.log('Fight button clicked!') },
        { label: 'Map', callback: () => console.log('Map button clicked!') },
        { label: 'Bag', callback: () => console.log('Bag button clicked!') },
        { label: 'Run', callback: () => {
            scene.shutdown();
            scene.scene.start('MainMenu');
        } },
        { label: 'Dev', callback: () => {
            addPokemonToPlayerTeam(scene);
            displayPlayerTeam(scene, width, height);
            }
        },  // Added Dev button
    ];

    const buttonSpacing = width / (navOptions.length + 1);
    const buttonStyle = { font: '22px Arial', fill: '#ffffff' };

    return navOptions.map((option, index) =>
        scene.add.text(buttonSpacing * (index + 1), height - bottomGameBarHeight / 2, option.label, buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', option.callback)
            .on('pointerover', function () { this.setStyle({ fill: '#ffcc00' }); })
            .on('pointerout', function () { this.setStyle({ fill: '#ffffff' }); })
    );
}

function displayEnemyInfo(scene, width){
        // Text style for enemy details
        const textStyle = {
            font: '18px Arial',
            color: '#ffffff',
        };

        // Display enemy name and level
        scene.enemyNameText = scene.add.text(
            40,  // Left-aligned with a small margin
            topGameBarHeight / 2,
            capitalizeName(scene.enemy), // Placeholder for enemy name and level
            textStyle
        ).setOrigin(0, 0.5); // Left alignment, vertically centered

        // Placeholder for health bar
        // const healthBarWidth = 200;
        // const healthBarHeight = 16;
        // const healthBarX = (width / 2) - (healthBarWidth / 2); // Centered horizontally
        // const healthBarY = (topGameBarHeight / 2) - (healthBarHeight / 2); // Centered vertically
        // scene.healthBarBg = scene.add.graphics();
        // scene.healthBarBg.fillStyle(0x555555, 1); // Grey background
        // scene.healthBarBg.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        // scene.healthBar = scene.add.graphics();
        // scene.healthBar.fillStyle(0xff0000, 1); // Red health
        // scene.healthBar.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        // Placeholder for caught icon
        // const iconSize = 32;
        // scene.caughtIcon = scene.add.text(
        //     width - 40, // Right-aligned with a margin
        //     topGameBarHeight / 2,
        //     '⚪', // Placeholder icon (can replace with a sprite later)
        //     { font: '24px Arial', color: '#ffffff' }
        // ).setOrigin(0.5, 0.5); // Centered around its position
}

function setGameContainers(scene, height){
        // Calculate game area sizes
        var gameAreaHeight = height - topGameBarHeight - bottomGameBarHeight
        var topContainerHeight = gameAreaHeight / 2;
    
        // Enemy and Team Containers
        scene.topContainer = scene.add.container(0, topGameBarHeight);
        scene.bottomContainer = scene.add.container(0, topGameBarHeight + topContainerHeight);
}

export function displayEnemy(scene, width, height) {
    if (!scene.enemy) {
        console.warn('Enemy Pokémon is not loaded.');
        return;
    }
    else {
        displayEnemyInfo(scene, width);
        // TODO: Display enemy sprite
        // const { width } = this.scale;
        // Calculate game area sizes
        var gameAreaHeight = height - topGameBarHeight - bottomGameBarHeight
        var topContainerHeight = gameAreaHeight / 2;
    
        // // Destroy the old sprite if it exists
        // if (this.enemySprite) {
        //     console.log('Removing existing enemy sprite...');
        //     this.enemySprite.destroy();
        //     this.enemySprite = null;
        // }
    
        console.log('Displaying enemy sprite...');
        // var enemySprite = scene.add.image(width / 2, this.topContainerHeight / 2, 'enemySprite')
        //     .setOrigin(0.5)
        //     .setDisplaySize(96, 96);
        // scene.topContainer.add(enemySprite);
        const textStyle = {
            font: '18px Arial',
            color: '#ffffff',
        };

        const text = scene.add.text(width / 2, topContainerHeight / 2, capitalizeName(scene.enemy), textStyle).setOrigin(0.5);
        scene.topContainer.add(text);
    }
}

export function displayPlayerTeam(scene, width, height) {
    if (scene.playerTeam.length === 0) {
        console.error('Player team is empty.');
        return;
    }
    const teamSize = scene.playerTeam.length;
    // Clear existing slots in the bottom container
    scene.bottomContainer.removeAll(true);

    for (let i = 0; i < teamSize; i++) {
        const pokemonName = scene.playerTeam[i] ? capitalizeName(scene.playerTeam[i]) : null; // Use Pokémon name if it exists
        displayPlayerTeamSlot(scene, width, height, pokemonName, i, teamSize);
    }

    // const availableWidth = width * 0.8;
    // const spriteSize = Math.min(96, availableWidth / teamSize - 10);
    // const totalWidth = spriteSize * teamSize + (teamSize - 1) * 10;
    // const startX = (width - totalWidth) / 2;

    // for (let i = 0; i < teamSize; i++) {
    //     const slotX = startX + i * (spriteSize + 50);
    //     const pokemon = this.playerTeam[i];

    //     const sprite = this.add.image(slotX, this.bottomContainerHeight / 2, pokemon.name)
    //         .setOrigin(0.5)
    //         .setDisplaySize(spriteSize, spriteSize);
    //     this.bottomContainer.add(sprite);

    //     const capitalizedName = this.capitalizeName(pokemon.name);
    //     const text = this.add.text(slotX, this.bottomContainerHeight / 2 + spriteSize / 2 + 10, capitalizedName, {
    //         font: '16px Arial',
    //         fill: '#ffffff',
    //     }).setOrigin(0.5);
    //     this.bottomContainer.add(text);
    // }
}

function displayPlayerTeamSlot(scene, width, height, pokemonName, index, totalSlots) {
    // Calculate game area sizes
    const topBarHeight = 50; // Example value for the top bar height
    const bottomBarHeight = 80; // Example value for the bottom bar height
    const gameAreaHeight = height - topBarHeight - bottomBarHeight;
    const bottomContainerHeight = gameAreaHeight / 2;

    // Slot configuration
    const slotWidth = 120;
    const slotHeight = 60;
    const spacing = 20;

    const totalWidth = totalSlots * (slotWidth + spacing) - spacing;
    const startX = (width - totalWidth) / 2;

    const slotX = startX + index * (slotWidth + spacing);
    const slotY = bottomContainerHeight / 2 - slotHeight / 2;

    // Add a semi-transparent rounded rectangle for the slot
    const slotGraphics = scene.add.graphics();
    slotGraphics.fillStyle(0x000000, 0.5); // Black with 50% transparency
    slotGraphics.fillRoundedRect(slotX, slotY, slotWidth, slotHeight, 10); // Rounded corners with radius 10
    scene.bottomContainer.add(slotGraphics);

    // Add the Pokémon's name to the slot
    const textStyle = {
        font: '16px Arial',
        color: '#ffffff',
        align: 'center',
    };

    const nameText = scene.add.text(
        slotX + slotWidth / 2, 
        slotY + slotHeight / 2, 
        pokemonName || 'Empty', 
        textStyle
    ).setOrigin(0.5);
    scene.bottomContainer.add(nameText);

}


function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Function to add a Pokémon to the player’s team, up to a max of 6
async function addPokemonToPlayerTeam(scene) {
    if (scene.playerTeam.length >= 6) {
        console.log('Player team is full.');
        return;
    }

    // Fetch the Pokémon data
    // const newPokemon = await scene.fetchPokemon('name=charmander');
    // if (newPokemon) {
    //     const spriteKey = newPokemon.name; // Use Pokémon name as key
    //     scene.load.image(spriteKey, newPokemon.icon); // Load sprite with name as key

    //     scene.playerTeam.push(newPokemon); // Add Pokémon to the team
    //     console.log(`Added ${newPokemon.name} to player team.`);

    //     // Ensure sprite is displayed after loading
    //     scene.load.once('complete', () => {
    //         scene.displayPlayerTeam(); // Update the display
    //     });
    //     scene.load.start(); // Start the loading process
    // } else {
    //     console.error('Failed to add new Pokémon to team.');
    // }

    scene.playerTeam.push("bulbasaur");
}
