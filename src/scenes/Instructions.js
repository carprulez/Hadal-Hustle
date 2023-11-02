class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene"); 
    }

    preload() {
        this.load.image('instructionsScreen', './assets/instructionsHadal.png')
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'center',
            fixedWidth: 0
        }
        this.add.tileSprite(0, 0, 1080, 840, 'instructionsScreen').setOrigin(0, 0);

        this.add.text(game.config.width/2, game.config.height-60, 'Press SPACE to launch sub', menuConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}