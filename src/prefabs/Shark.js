// Shark prefab
class Shark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, Phaser.Math.Between(height - ) texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2;
    }

    update() {
        this.x -= this.moveSpeed;
    }
}