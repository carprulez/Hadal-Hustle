// Carter Gruebel
// Hadal Hustle
// 22 hours
// The technical aspect that I am proud of figuring out how to set gravity to just one sprite and 
// not have it affect anything else in the physics world.
//
// I was really proud that I made all of the visual assets for this game.
// I do not do art very much but I had fun making the art, especially the title screen.

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