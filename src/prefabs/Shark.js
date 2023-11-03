// Shark prefab
class Shark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, Phaser.Math.Between(game.config.height / 8, game.config.height - sharkHeight/2), 'shark');
        scene.add.existing(this);
        this.moveSpeed = 2;
    }

    update() {
        this.x -= this.moveSpeed;
    }
}