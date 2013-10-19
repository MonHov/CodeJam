///<reference path="../lib/phaser.d.ts"/>
var Player = (function () {
    // array of status effects
    function Player(sprite, game) {
        this.game = game;
        this.sprite = sprite;
        //this.sprite.height = 32;
        //this.sprite.width = 32;
        this.sprite.maxVelocity.x = 250;
        this.sprite.drag.x = 900;
        this.keyboard = game.input.keyboard;
    }
    Player.prototype.update = function () {
        // Player controls
        if(this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.acceleration.x += 100;
            this.sprite.flipped = true;
        } else if(this.keyboard.justReleased(Phaser.Keyboard.RIGHT)) {
            this.sprite.acceleration.x = 0;
        }
        if(this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.acceleration.x -= 30;
            this.sprite.flipped = false;
        } else if(this.keyboard.justReleased(Phaser.Keyboard.LEFT)) {
            this.sprite.acceleration.x = 0;
        }
    };
    return Player;
})();
///<reference path="lib/phaser.d.ts"/>
///<reference path="entities/Player.ts"/>
var game = new Phaser.Game(this, 'content', 800, 600, init, create, update);
var player;
function init() {
    //game.loader.addTextureAtlas('entities', 'assets/textures/entities.png', 'assets/textures/entities.txt');
    game.loader.addImageFile('mario', 'assets/player.mario.png');
    game.loader.load();
}
;
function create() {
    var playerSprite = game.createSprite(game.stage.width * .5 - 50, 200, 'mario');
    player = new Player(playerSprite, game);
    //player.drag.x = 900;
    //player.maxVelocity.x = 250;
    //player.animations.add('idle', ['assets/player.mario.png'], 10, false, false);
    //player.animations.play('idle');
    }
;
function update() {
    player.update();
}
;
//@ sourceMappingURL=application.js.map
