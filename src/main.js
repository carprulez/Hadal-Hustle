// Carter Gruebel
// Hadal Hustle
// hours spent
// creative tilt justification

let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 840,
    scene: [ Menu, Play, GameOver, Instructions ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}
let game = new Phaser.Game(config);

// reserve keyboard var
let keySPACE, keyR;
let { width, height } = game.config;