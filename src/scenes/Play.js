class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('sub', './assets/sub.png');
        this.load.image('shark', './assets/shark.png');
        this.load.spritesheet('eel', './assets/eel.png', {
            frameWidth: 136,
            frameHeight: 59
        })
        this.load.image('deepSea', './assets/deepSea.png');
        this.load.image('oceanFloor', './assets/oceanFloor.png');
        this.load.image('collisionLine', './assets/collisionLine.png');
    }

    create() {
        // add background
        this.deepSea = this.add.tileSprite(0, 0, 1080, 840, 'deepSea').setOrigin(0, 0);
        this.oceanFloor = this.add.tileSprite(0, game.config.height - 233, 1080, 233, 'oceanFloor').setOrigin(0, 0);

        this.anims.create({
            key: 'swimming',
            frameRate: 4  ,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('eel', { start: 0, end: 1 }),
        })

        this.sharks = 0;
        this.eels = 0;
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

        let creditsConfig = {
            fontFamily: 'Courier',
            fontSize: '10px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            }
        }

        let eventConfig1 = {
            delay: 6000,
            loop: true,
            callback: this.addEel(),
            callbackScope: this
        }

        let eventConfig2 = {
            delay: 6000,
            loop: true,
            callback: this.addShark(),
            callbackScope: this
        }
        
        // add elapsed time
        this.total = this.add.text(game.config.width/2 - 35 , 0, this.score, scoreConfig);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // add sub
        this.sub = this.physics.add.sprite(width / 10, height / 2, 'sub')
        this.sub.body.setCollideWorldBounds(true);
        this.sub.body.setGravityY(300);

        // add ocean floor
        this.collisionLine = this.physics.add.sprite(540, 800, 'collisionLine');
        this.collisionLine.body.setImmovable(true);

        this.clock = this.time.delayedCall(10000000000000, () => {
            this.gameOver = true
        }, null, this);

        // add groups
        this.sharkGroup = this.physics.add.group(config = {
            arcade: true
        });
        this.sharkGroup

        this.eelGroup = this.physics.add.group(config = {
            arcade: true
        });

        this.speedUp = this.time.delayedCall(15, () => {
            this.eelGroup.increase = true;
            this.sharkGroup.increase = true;
        }, null, this);

        this.time.addEvent(eventConfig1);
        this.time.addEvent(eventConfig2);

        // add collision with floor
        this.physics.add.collider(this.sub, this.collisionLine, (sub) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press R to restart', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height - 32, 'Art by: Carter Gruebel     SFX by: Carter Gruebel    Gameplay by: Carter Gruebel    Music by: JuliusH - downloaded from https://pixabay.com/music/search/ocean/?pagi=3', creditsConfig).setOrigin(0.5);
            this.gameOver = true;
        });
        
        // add collision with enemies
        this.physics.add.collider(this.sub, this.sharkGroup, (sub) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press R to restart', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height - 32, 'Art by: Carter Gruebel     SFX by: Carter Gruebel    Gameplay by: Carter Gruebel    Music by: JuliusH - downloaded from https://pixabay.com/music/search/ocean/?pagi=3', creditsConfig).setOrigin(0.5);
            this.gameOver = true;
        });
        this.physics.add.collider(this.sub, this.eelGroup, (sub) => {
            this.sound.play('subExplosion');
            sub.destroy();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press R to restart', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height - 32, 'Art by: Carter Gruebel     SFX by: Carter Gruebel    Gameplay by: Carter Gruebel    Music by: JuliusH - downloaded from https://pixabay.com/music/search/ocean/?pagi=3', creditsConfig).setOrigin(0.5);
            this.gameOver = true;
        });
    }

    // creating enemies and adding to group
    addShark() {
        new Shark(this, game.config.width, Phaser.Math.Between(40, 565), 'shark');
    }

    addEel() {
        new Eel(this, game.config.width, Phaser.Math.Between(40, 565), 'eel', 0);
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
            this.oceanFloor.tilePositionX += 6 ;
            if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.sub.body.setVelocityY(-175);
            }
            this.eelGroup.getChildren().forEach((EEL) => {
                EEL.setVelocityX(-350)
                EEL.setImmovable(false);
                EEL.update();
            })
            this.sharkGroup.getChildren().forEach((SHARK) => {
                SHARK.setVelocityX(-250)
                SHARK.setImmovable(false);
                SHARK.update();
            })
        }
    }
}