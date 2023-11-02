// Sub prefab
class Sub extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
    }

    update() {
        // add movement
    }
}