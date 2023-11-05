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

        this.p1Score = 0;
        this.gameOver = false;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        
        this.score = this.add.text(width - 20, height + 20, this.p1Score, scoreConfig);

        // adding world gravity
        this.physics.world.gravity.y = 300;

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        cursors = this.input.keyboard.createCursorKeys()

        // add sub
        this.sub = this.physics.add.sprite(width / 10, height / 2, 'sub')
        this.sub.body.setCollideWorldBounds(true);
        this.sub.body.setAllowGravity(true);

        this.shark = this.physics.add.sprite(width, 'shark');
        this.shark.body.setAllowGravity(false);

        // add ocean floor
        this.oceanFloor = this.physics.add.sprite(540, 725, 'oceanFloor');
        this.oceanFloor.body.setAllowGravity(false);
        this.oceanFloor.body.setImmovable(true);

        this.physics.add.collider(this.sub, this.oceanFloor, (sub, oceanFloor) => {
            sub.destroy();
            this.gameOver = true;
        });
        this.physics.add.collider(this.sub, this.shark, (sub, shark) => {
            sub.destroy();
            this.gameOver = true;
        });
        this.physics.add.collider(this.sub, this.eel, (sub, eel) => {
            sub.destroy();
            this.gameOver = true;
        });
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(cursors.space.isDown) {
            this.sub.body.setVelocityY(-175)
        }

        this.deepSea.tilePositionX -= 3;
    }
}