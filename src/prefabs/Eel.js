// Eel prefab
class Eel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.parentScene = scene;
        this.anims.play('swimming')
    }

    update() {
        // destroy if hits edge of screen
        if(this.x <= 0 - this.width) {
            this.destroy();
        }
    }
}