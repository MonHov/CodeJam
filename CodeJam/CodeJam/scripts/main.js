/// <reference path="~\scripts\phaser.js">

define(["phaser", "entities/localPlayer", "entities/remotePlayer"], function (Phaser, localPlayer, remotePlayer) {
    var game = new Phaser.Game(800, 640, Phaser.CANVAS, '', {
        preload: init,
        create: create,
        update: update,
        render: render
    });
    console.log(game);

    var player;
    var socket;


    var map;
    var tileset;
    var layer;
    var bg;

    function init() {

        game.load.tilemap('desert', 'assets/maps/collision.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tileset('tiles', 'assets/tiles/smb_tiles.png', 16, 16);

        //game.stage.disablePauseScreen = true;
        game.load.image('mario', 'assets/player.mario.png');
    }

    function create() {

        game.stage.backgroundColor = '#93CCEA';

        map = game.add.tilemap('desert');
                
        tileset = game.add.tileset('tiles');

        tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);

        layer = game.add.tilemapLayer(0, 0, 800, 640, tileset, map, 0);

        layer.resizeWorld();

        

        var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 200, 'mario');
        player = new localPlayer(playerSprite, game, socket);

        game.camera.follow(player.sprite);
    }
    var b;
    function update() {

        //overlap = layer.getTiles(player.sprite.body.x, player.sprite.body.y, player.sprite.body.width, player.sprite.body.height, true);

        //if (overlap.length > 1) {
        //    for (var i = 1; i < overlap.length; ++i) {
        //        game.physics.separateTile(player.sprite.body, overlap[i]);
        //    }
        //}

        game.physics.collide(player.sprite, layer);
        player.update();

        b = new Phaser.Rectangle(player.sprite.body.x, player.sprite.body.y, player.sprite.body.width, player.sprite.body.height);

        

        
    }

    function render() {
        game.debug.renderSpriteCorners(player.sprite);
        //game.debug.renderSpriteCorners(layer);
        
        //game.debug.renderRectangle(b, 'rgba(0,20,91,1)');
    }
});
