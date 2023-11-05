class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('titleScreen', './assets/titleScreenHadal.png');
        this.load.audio('titleMusic', './assets/titleMusicHadal.mp3');
        this.load.audio('subExplosion', './assets/subExplosion.wav');
        this.load.audio('startGame', './assets/startGame.wav');
        this.load.audio('toIntro', './assets/toIntro.wav');
        this.load.audio('restart', './assets/restart.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'center',
            fixedWidth: 0
        }
        this.add.tileSprite(0, 0, 1080, 840, 'titleScreen').setOrigin(0, 0);

        this.add.text(game.config.width/2, game.config.height-80, 'Press SPACE to start', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('toIntro');
            this.scene.start('instructionsScene');
        }
    }
}