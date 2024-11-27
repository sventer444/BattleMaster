import BaseScene from './base.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('GameScene');
    }

    create() {
        super.create();

        const { width, height } = this.scale;

        // Add a Material grey background
        this.background = this.add.graphics();
        this.background.fillStyle(0x9e9e9e, 1); // Material grey color (#9E9E9E)
        this.background.fillRect(0, 0, width, height);

        // Add the top bar
        this.topBarHeight = 50;
        this.topBar = this.add.graphics();
        this.topBar.fillStyle(0x212121, 1); // Dark grey color (#212121)
        this.topBar.fillRect(0, 0, width, this.topBarHeight);

        // Example multipliers (6 numbers with different colors)
        const multiplierColors = [0xff5722, 0x4caf50, 0x2196f3, 0xffeb3b, 0x9c27b0, 0xe91e63];
        const multipliers = [1.1, 2.5, 3.0, 1.8, 2.2, 4.0];

        const textStyle = {
            font: '20px Arial',
            color: '#ffffff',
        };

        const spacing = width / multipliers.length; // Even spacing for the numbers
        this.multiplierTexts = multipliers.map((value, index) =>
            this.add.text(
                spacing * index + spacing / 2, // X position
                this.topBarHeight / 2,        // Center vertically in the bar
                value.toFixed(1),            // Display the multiplier (1 decimal)
                {
                    ...textStyle,
                    color: `#${multiplierColors[index].toString(16)}`, // Convert color to hex
                }
            ).setOrigin(0.5) // Center align the text
        );

        // Add the bottom navigation bar
        this.bottomBarHeight = 80;
        this.bottomBar = this.add.graphics();
        this.bottomBar.fillStyle(0x212121, 1); // Dark grey color (#212121)
        this.bottomBar.fillRect(0, height - this.bottomBarHeight, width, this.bottomBarHeight);

        // Add navigation buttons, evenly spaced
        const navOptions = [
            { label: 'Fight', callback: () => console.log('Fight button clicked!') },
            { label: 'Map', callback: () => console.log('Map button clicked!') },
            { label: 'Bag', callback: () => console.log('Bag button clicked!') },
            { label: 'Run', callback: () => console.log('Run button clicked!') },
        ];

        const buttonStyle = {
            font: '22px Arial',
            fill: '#ffffff',
        };

        const buttonSpacing = width / (navOptions.length + 1); // Spacing between buttons
        this.navButtons = navOptions.map((option, index) =>
            this.add.text(buttonSpacing * (index + 1), height - this.bottomBarHeight / 2, option.label, buttonStyle)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true }) // Makes the button interactive
                .on('pointerdown', option.callback)
                .on('pointerover', function () {
                    this.setStyle({ fill: '#ffcc00' }); // Highlight on hover
                })
                .on('pointerout', function () {
                    this.setStyle({ fill: '#ffffff' }); // Reset on hover out
                })
        );

        // Handle resizing
        this.scale.on('resize', this.resizeGame, this);

        // Add the game area between the top and bottom bars
        this.gameAreaHeight = height - this.topBarHeight - this.bottomBarHeight;

        // Top container for "enemy"
        this.topContainerHeight = this.gameAreaHeight / 2;
        this.topContainer = this.add.container(0, this.topBarHeight); // Positioned below the top bar
        this.enemyText = this.add.text(width / 2, this.topContainerHeight / 2, 'Enemy', {
            font: '32px Arial',
            fill: '#ffffff',
        }).setOrigin(0.5);
        this.topContainer.add(this.enemyText);

        // Bottom container for "Team"
        this.bottomContainerHeight = this.gameAreaHeight / 2;
        this.bottomContainer = this.add.container(0, this.topBarHeight + this.topContainerHeight); // Positioned below the top container
        this.teamText = this.add.text(width / 2, this.bottomContainerHeight / 2, 'Team', {
            font: '32px Arial',
            fill: '#ffffff',
        }).setOrigin(0.5);
        this.bottomContainer.add(this.teamText);
    }

    resizeGame(gameSize) {
        const { width, height } = gameSize;

        // Adjust background
        this.background.clear();
        this.background.fillStyle(0x9e9e9e, 1);
        this.background.fillRect(0, 0, width, height);

        // Adjust top bar
        this.topBar.clear();
        this.topBar.fillStyle(0x212121, 1);
        this.topBar.fillRect(0, 0, width, this.topBarHeight);

        // Adjust multipliers
        const spacing = width / this.multiplierTexts.length;
        this.multiplierTexts.forEach((text, index) => {
            text.setX(spacing * index + spacing / 2);
        });

        // Adjust bottom bar
        this.bottomBar.clear();
        this.bottomBar.fillStyle(0x212121, 1);
        this.bottomBar.fillRect(0, height - this.bottomBarHeight, width, this.bottomBarHeight);

        // Adjust navigation buttons
        const buttonSpacing = width / (this.navButtons.length + 1);
        this.navButtons.forEach((button, index) => {
            button.setPosition(buttonSpacing * (index + 1), height - this.bottomBarHeight / 2);
        });

        // Adjust game area height
        this.gameAreaHeight = height - this.topBarHeight - this.bottomBarHeight;

        // Adjust top container (enemy area)
        this.topContainer.setPosition(0, this.topBarHeight);
        this.topContainerHeight = this.gameAreaHeight / 2;
        this.enemyText.setPosition(width / 2, this.topContainerHeight / 2);

        // Adjust bottom container (team area)
        this.bottomContainer.setPosition(0, this.topBarHeight + this.topContainerHeight);
        this.bottomContainerHeight = this.gameAreaHeight / 2;
        this.teamText.setPosition(width / 2, this.bottomContainerHeight / 2);
    }
}
