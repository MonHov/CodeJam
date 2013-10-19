///<reference path="../lib/phaser.d.ts"/>
var Player = (function () {
    // array of status effects
    function Player(sprite, game, socket) {
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;
        //this.sprite.height = 32;
        //this.sprite.width = 32;
        this.sprite.maxVelocity.x = 250;
        this.sprite.drag.x = 900;
    }
    Player.prototype.update = function (position) {
    };
    return Player;
})();
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../lib/phaser.d.ts"/>
///<reference path="Player.ts"/>
var LocalPlayer = (function (_super) {
    __extends(LocalPlayer, _super);
    function LocalPlayer(sprite, game, socket) {
        _super.call(this, sprite, game, socket);
        this.keyboard = game.input.keyboard;
    }
    LocalPlayer.prototype.update = function (position) {
        _super.prototype.update.call(this);
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
        socket.emit('playermove', {
            x: this.sprite.x,
            y: this.sprite.y
        });
    };
    return LocalPlayer;
})(Player);
///<reference path="../lib/phaser.d.ts"/>
///<reference path="Player.ts"/>
var RemotePlayer = (function (_super) {
    __extends(RemotePlayer, _super);
    function RemotePlayer(sprite, game, socket) {
        _super.call(this, sprite, game, socket);
    }
    RemotePlayer.prototype.update = function (position) {
        _super.prototype.update.call(this);
        if(position) {
            this.sprite.x = position.x;
            this.sprite.y = position.y;
        }
    };
    return RemotePlayer;
})(Player);
var firstPlayer = false;
var socket = io.connect("http://10.7.1.171:80");
var player;
var playerConstructor;
var remotePosition;
var game;
socket.on('status', function (status) {
    if(status === 'player') {
        playerConstructor = LocalPlayer;
    } else {
        playerConstructor = RemotePlayer;
        socket.on('playermove', function (position) {
            remotePosition = position;
        });
    }
    game = new Phaser.Game(this, 'content', 800, 600, init, create, update);
});
socket.emit('playerjoin');
function init() {
    //game.loader.addTextureAtlas('entities', 'assets/textures/entities.png', 'assets/textures/entities.txt');
    game.stage.disablePauseScreen = true;
    game.loader.addImageFile('mario', 'assets/player.mario.png');
    game.loader.load();
}
;
function create() {
    var playerSprite = game.createSprite(game.stage.width * .5 - 50, 200, 'mario');
    player = new playerConstructor(playerSprite, game, socket);
    //player.drag.x = 900;
    //player.maxVelocity.x = 250;
    //player.animations.add('idle', ['assets/player.mario.png'], 10, false, false);
    //player.animations.play('idle');
    }
;
function update() {
    player.update(remotePosition);
}
;
//@ sourceMappingURL=application.js.map
