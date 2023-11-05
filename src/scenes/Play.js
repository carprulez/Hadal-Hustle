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
        this.deepSea = this.add.tileSprite(0, 0, 1080, 840, 'deepSea').setOrigin(0, 0);

        this.score = 0;
        this.gameOver = false;

        // adding looping music
        // https://stackoverflow.com/questions/34210393/looping-audio-in-phaser
        const backgroundMusic = this.sound.add('titleMusic');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#3D3D3D',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }

        let gameOverConfig = {
            fontFamily: 'Futura',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
        }
        
        // add elapsed time
        this.total = this.add.text(game.config.width/2 - 35 , 0, this.score, scoreConfig);

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

        this.clock = this.time.delayedCall(100000000000, () => {
            this.gameOver = true
        }, null, this);

        this.speedUp = this.time.delayedCall(15, () => {
            this.eelGroup.increase = true;
            this.sharkGroup.increase = true;
        }, null, this);

        // add collision with floor
        this.physics.add.collider(this.sub, this.oceanFloor, (sub, oceanFloor) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press R to restart', gameOverConfig).setOrigin(0.5);
            this.gameOver = true;
        });
        
        // add collision with enemies
        this.physics.add.collider(this.sub, this.shark, (sub, shark) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press R to restart', gameOverConfig).setOrigin(0.5);
            this.gameOver = true;
        });
        this.physics.add.collider(this.sub, this.eel, (sub, eel) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press R to restart', gameOverConfig).setOrigin(0.5);
            this.gameOver = true;
        });
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('restart');
            this.scene.start('instructionsScene');
        }

        if(!this.gameOver) {
            this.sub.update();
            // adding clock
            this.score = Math.ceil(this.clock.elapsed / 1000);
            this.total.setText(this.score);
            this.deepSea.tilePositionX += 3;
            if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.sub.body.setVelocityY(-175);
            }
        }
    }
}