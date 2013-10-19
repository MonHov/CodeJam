///<reference path="lib/phaser.d.ts"/>
///<reference path="entities/Player.ts"/>
///<reference path="entities/LocalPlayer.ts"/>
///<reference path="entities/RemotePlayer.ts"/>

declare var io;

var firstPlayer = false;
var socket = io.connect("http://10.7.1.171:80");
var player: Player;
var playerConstructor;
var remotePosition;
var game: Phaser.Game;

socket.on('status', function (status) {
    if (status === 'player') {
        playerConstructor = LocalPlayer;
    }
    else {
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
};

function create() {
        
    var playerSprite = game.createSprite(game.stage.width * .5 - 50, 200, 'mario');

    player = new playerConstructor(playerSprite, game, socket);
        //player.drag.x = 900;
        //player.maxVelocity.x = 250;
        //player.animations.add('idle', ['assets/player.mario.png'], 10, false, false);
        //player.animations.play('idle');
 };

 function update() {
     player.update(remotePosition);
 };