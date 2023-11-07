// Shark prefab
class Shark extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.parentScene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 2;
        this.increase = false;
    }

    update() {
        // destroy if hits edge of screen
        if(this.x <= 0 - this.width) {
            this.destroy();
        }
    }
}