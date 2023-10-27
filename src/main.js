// Carter Gruebel
// Hadal Hustle
// hours spent
// creative tilt justification

let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 840,
    scene: [ Menu, Play, GameOver, Instructions ]
}
let game = new Phaser.Game(config);

// reserve keyboard var
let keySPACE;

// set UI size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;