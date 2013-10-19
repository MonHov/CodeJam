///<reference path="lib/phaser.d.ts"/>
///<reference path="Whatever.ts"/>

var game = new Phaser.Game(this, 'content', 800, 600, init, create, update);

var player: Phaser.Sprite;

function init() { 
    //game.loader.addTextureAtlas('entities', 'assets/textures/entities.png', 'assets/textures/entities.txt');
    game.loader.addImageFile('mario', 'assets/player.mario.png');
    game.loader.load();
};
function create() {
        player = game.createSprite(game.stage.width * .5 - 50, 200, 'mario');
        player.drag.x = 900;
        player.width = 100;
        player.height = 100;
        player.maxVelocity.x = 250;
        //player.animations.add('idle', ['assets/player.mario.png'], 10, false, false);
        //player.animations.play('idle');
 };
function update() { };