class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('sub', './assets/sub.png');
        this.load.image('shark', './assets/shark.png');
        this.load.image('eel', './assets/eel.png');
        this.load.image('deepSea', './assets/deepSea.png');
        this.load.image('oceanFloor', './assets/oceanFloor.png');
    }

    create() {
        // add background
        this.deepSea = this.add.image(0, 0, 'deepSea').setOrigin(0, 0);
        
        // adding world gravity
        this.physics.world.gravity.y = 300;

        cursors = this.input.keyboard.createCursorKeys()

        // add sub
        this.sub = this.physics.add.sprite(width / 10, height / 2, 'sub')
        this.sub.body.setCollideWorldBounds(true);
        this.sub.body.setAllowGravity(true);

        this.shark = this.physics.add.sprite(width, 'shark');
        this.shark.body.setAllowGravity(false);

        // add ocean floor
        this.oceanFloor = this.physics.add.sprite(0, 775, 'oceanFloor');
        this.oceanFloor.body.setAllowGravity(false);
        this.oceanFloor.body.setImmovable(true);

        this.physics.add.collider(this.sub, this.oceanFloor);
        this.physics.add.collider(this.sub, this.shark);
        this.physics.add.collider(this.sub, this.eel);
        this.gameOver = false;
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(cursors.space.isDown) {
            this.sub.body.setVelocityY(-250)
        }

        this.deepSea.tilePositionX -= 3;
    }
}