import { addPokemonToPlayerTeam, getPlayerTeam, fetchPokemon } from "../helpers/pokemonhelpers.js";

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
}

function displayNavButtons(scene, width, height) {
    const navOptions = [
        { label: 'Fight', callback: () => console.log('Fight button clicked!') },
        { label: 'Map', callback: () => {
            scene.shutdown();
            scene.scene.start('Map');
        } },
        { label: 'Bag', callback: () => {
            scene.shutdown();
            scene.scene.start('Bag');
        } },
        { label: 'Run', callback: () => {
            scene.shutdown();
            scene.scene.start('MainMenu');
        } },
        { label: 'Dev', callback: async () => {
            await addPokemonToPlayerTeam(scene, "bulbasaur");
            scene.enemy = await fetchPokemon(scene, "pikachu");
            displayPlayerTeam(scene, width, height);
            displayEnemy(scene, width, height);
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

function displayEnemyInfo(scene, width) {
    // Text style for enemy details
    const textStyle = {
        font: '18px Arial',
        color: '#ffffff',
    };

    // Display enemy name and level
    const enemyNameAndLevel = `${capitalizeName(scene.enemy.name)} Lv.${scene.enemy.currentStats.level}`;
    scene.enemyNameText = scene.add.text(
        40, // Left-aligned with a small margin
        topGameBarHeight / 2,
        enemyNameAndLevel,
        textStyle
    ).setOrigin(0, 0.5); // Left alignment, vertically centered

    // Placeholder for health bar
    const healthBarWidth = 200;
    const healthBarHeight = 16;
    const healthBarX = (width / 2) - (healthBarWidth / 2); // Centered horizontally
    const healthBarY = (topGameBarHeight / 2) - (healthBarHeight / 2); // Centered vertically

    // Grey background for health bar
    scene.healthBarBg = scene.add.graphics();
    scene.healthBarBg.fillStyle(0x555555, 1);
    scene.healthBarBg.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Red health bar
    scene.healthBar = scene.add.graphics();
    const healthPercentage = scene.enemy.currentStats.currentHp / scene.enemy.currentStats.hp; // Example health calculation
    scene.healthBar.fillStyle(0xff0000, 1);
    scene.healthBar.fillRect(
        healthBarX,
        healthBarY,
        healthBarWidth * healthPercentage,
        healthBarHeight
    );

    // Display remaining/total health to the right of the health bar
    const healthText = `${scene.enemy.currentStats.currentHp}/${scene.enemy.currentStats.hp}`;
    scene.healthText = scene.add.text(
        healthBarX + healthBarWidth + 10, // Slightly to the right of the health bar
        topGameBarHeight / 2,
        healthText,
        textStyle
    ).setOrigin(0, 0.5); // Left alignment, vertically centered

    // Placeholder for caught icon
    const iconSize = 32;
    scene.caughtIcon = scene.add.text(
        width - 40, // Right-aligned with a margin
        topGameBarHeight / 2,
        '⚪', // Placeholder icon (can replace with a sprite later)
        { font: '24px Arial', color: '#ffffff' }
    ).setOrigin(0.5, 0.5); // Centered around its position
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
        const enemySprite = scene.add.image(width / 2, topContainerHeight / 2, `${scene.enemy.name}Sprite`, scene.enemy.sprite)
        .setOrigin(0.5)
        .setDisplaySize(96, 96);
        // const text = scene.add.text(width / 2, topContainerHeight / 2, capitalizeName(scene.enemy.name), textStyle).setOrigin(0.5);
        scene.topContainer.add(enemySprite);
    }
}

export function displayPlayerTeam(scene, width, height) {
    var playerTeam = getPlayerTeam();
    if (playerTeam.length === 0) {
        console.error('Player team is empty.');
        return;
    }
    const teamSize = playerTeam.length;
    // Clear existing slots in the bottom container
    scene.bottomContainer.removeAll(true);

    for (let i = 0; i < teamSize; i++) {
        displayPlayerTeamSlot(scene, width, height, playerTeam[i], i, teamSize);
    }
}

function displayPlayerTeamSlot(scene, width, height, pokemon, index, totalSlots) {
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

    // Calculate offset to center the Pokémon's icon visually
    const iconHeight = 96; // Fixed display size
    const iconYOffset = (iconHeight - slotHeight) / 2;

    // Add the Pokémon's icon to the slot
    const pokemonIcon = scene.add.image(
        slotX + slotWidth / 2, 
        slotY + slotHeight / 2 - iconYOffset, // Adjust Y offset
        `${pokemon.name}Icon`
    )
    .setOrigin(0.5)
    .setDisplaySize(96, 96); // Maintain proper size
    scene.bottomContainer.add(pokemonIcon);
}

function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

