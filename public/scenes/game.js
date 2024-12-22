import BaseScene from './base.js';
import { initializeGameUI, displayEnemy, displayPlayerTeam } from '../ui/uisetup.js';
import { getPokemonByEncounterRate } from '../helpers/pokemonhelpers.js';

export default class GameScene extends BaseScene {
    constructor(key) {
        super(key);
        this.enemy = null;
        this.encounterPool = [];
    }

    preload() {
        const { width, height } = this.scale;
        // Set up the background, bars, and navigation buttons
        initializeGameUI(this, width, height);
    }

    create() {
        super.create();
        const { width, height } = this.scale;
    
        getPokemonByEncounterRate(this, this.encounterPool)
        .then((pokemon) => {
            this.enemy = pokemon
            displayEnemy(this, width, height);
        });
        displayPlayerTeam(this, width, height);
    }

    shutdown(){
        super.shutdown();
    }
}


    
    // updateEnemyInfo(name, level) {
    //     if (!name || !level) {
    //         console.error('Invalid enemy data:', name, level);
    //         return;
    //     }
    
    //     const { width } = this.scale;
    
    //     // Check if the text objects already exist and create them if they don't
    //     if (!this.enemyNameText) {
    //         this.enemyNameText = this.add.text(width / 2, this.topContainerHeight / 2 + 60, name, {
    //             font: '20px Arial',
    //             fill: '#ffffff',
    //         }).setOrigin(0.5);
    //     } else {
    //         // If text exists, update it
    //         this.enemyNameText.setText(name);
    //     }
    
    //     // Check if the enemy level text object already exists
    //     if (!this.enemyLevelText) {
    //         this.enemyLevelText = this.add.text(width / 2, this.topContainerHeight / 2 + 90, `Lv. ${level}`, {
    //             font: '18px Arial',
    //             fill: '#ffffff',
    //         }).setOrigin(0.5);
    //     } else {
    //         // If text exists, update it
    //         this.enemyLevelText.setText(`Lv. ${level}`);
    //     }
    // }
    
    // updateHealthBar(percentage) {
    //     const healthBarWidth = 200;
    //     const newWidth = healthBarWidth * percentage;
    //     this.healthBar.clear()
    //         .fillStyle(0xff0000, 1)
    //         .fillRect(
    //             (this.scale.width / 2) - (healthBarWidth / 2),
    //             (this.topBarHeight / 2) - (16 / 2),
    //             newWidth,
    //             16
    //         );
    // }

    // updateCaughtIcon(caught) {
    //     this.caughtIcon.setText(caught ? '✔️' : '⚪');
    // }

    // createHealthBar(width) {
    //     const healthBarWidth = 200;
    //     const healthBarHeight = 16;
    //     const healthBarX = (width / 2) - (healthBarWidth / 2);
    //     const healthBarY = this.topBarHeight / 2 - healthBarHeight / 2;

    //     this.healthBarBg = this.add.graphics()
    //         .fillStyle(0x555555, 1)
    //         .fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    //     this.healthBar = this.add.graphics()
    //         .fillStyle(0xff0000, 1)
    //         .fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    // }

    // createCaughtIcon(width) {
    //     this.caughtIcon = this.add.text(
    //         width - 40,
    //         this.topBarHeight / 2,
    //         '⚪',
    //         { font: '24px Arial', color: '#ffffff' }
    //     ).setOrigin(0.5, 0.5);
    // }

