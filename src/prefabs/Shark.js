// Shark prefab
class Shark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 3;
    }

    update() {
        this.x -= this.moveSpeed;
    }
}