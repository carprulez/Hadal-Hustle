// Sub prefab
class Sub extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, width / 10, height / 2, texture);
        this.parentScene = scene;
        // add object to scene
        scene.add.existing(this);
    }

    update() {
        // add movement
    }
}