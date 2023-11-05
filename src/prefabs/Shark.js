// Shark prefab
class Shark extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2;
        this.increasing = false;
    }

    update() {
        this.x -= this.moveSpeed;
        if(this.increase) {
            this.moveSpeed += 1;
            this.increase = false;
        }
        // destroy if hits edge of screen
        if(this.x <= 0 - this.width) {
            this.destroy()
        }
    }
}