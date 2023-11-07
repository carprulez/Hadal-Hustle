// Carter Gruebel
// Hadal Hustle
// hours spent
// creative tilt justification

let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 840,
    scene: [ Menu, Play, Instructions ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    render: { 
        pixelArt: true 
    }
}
let game = new Phaser.Game(config);

// reserve keyboard var
let keySPACE, keyR;
let cursors;
let { width, height } = game.config;