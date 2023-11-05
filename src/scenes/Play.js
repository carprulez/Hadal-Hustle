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

        // adding looping music
        // https://stackoverflow.com/questions/34210393/looping-audio-in-phaser
        const backgroundMusic = this.sound.add('titleMusic');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        
        // add elapsed time
        this.score = this.add.text(width, height, this.p1Score, scoreConfig);

        // adding world gravity
        this.physics.world.gravity.y = 300;

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // adding enemy groups
        this.sharkGroup = this.add.group({
            runChildUpdate: true
        });

        this.eelGroup = this.add.group({
            runChildUpdate: true
        });

        // add sub
        this.sub = this.physics.add.sprite(width / 10, height / 2, 'sub')
        this.sub.body.setCollideWorldBounds(true);
        this.sub.body.setAllowGravity(true);

        // add ocean floor
        this.oceanFloor = this.physics.add.sprite(540, 725, 'oceanFloor');
        this.oceanFloor.body.setAllowGravity(false);
        this.oceanFloor.body.setImmovable(true);

        // add collision with floor
        this.physics.add.collider(this.sub, this.oceanFloor, (sub, oceanFloor) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.gameOver = true;
        });
        
        // add collision with enemies
        this.physics.add.collider(this.sub, this.shark, (sub, shark) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.gameOver = true;
        });
        this.physics.add.collider(this.sub, this.eel, (sub, eel) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.gameOver = true;
        });
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('restart');
            this.scene.restart();
        }
        // adding clock
        this.p1Score = this.time.now / 1000;
        this.score.setText(this.p1Score);

        if(this.p1Score % 15 == 0) {
            this.sharkGroup.increase = true;
            this.eelGroup.increase = true;
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sub.body.setVelocityY(-175);
        }

        if(!this.gameOver) {
            this.sub.update();
        }

        this.deepSea.tilePositionX -= 3;
    }
}