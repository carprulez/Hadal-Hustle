// Shark prefab
class Shark extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.moveSpeed = 2;
        this.setImmovable();
        this.setAllowGravity(false);
    }

    update() {
        this.x -= this.moveSpeed;

        // destroy if hits edge of screen
        if(this.x <= 0 - this.width) {
            this.destroy()
        }
    }
}