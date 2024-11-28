export function setupBackground(scene, width, height) {
    const background = scene.add.graphics();
    background.fillStyle(0x37474f, 1);
    background.fillRect(0, 0, width, height);
    return background;
}

export function setupBars(scene, width, height, topBarHeight, bottomBarHeight) {
    const topBar = scene.add.graphics();
    topBar.fillStyle(0x212121, 1);
    topBar.fillRect(0, 0, width, topBarHeight);

    const bottomBar = scene.add.graphics();
    bottomBar.fillStyle(0x212121, 1);
    bottomBar.fillRect(0, height - bottomBarHeight, width, bottomBarHeight);

    return { topBar, bottomBar };
}

export function setupNavButtons(scene, width, height, bottomBarHeight, onRunCallback) {
    const navOptions = [
        { label: 'Fight', callback: () => console.log('Fight button clicked!') },
        { label: 'Map', callback: () => console.log('Map button clicked!') },
        { label: 'Bag', callback: () => console.log('Bag button clicked!') },
        { label: 'Run', callback: onRunCallback },
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
