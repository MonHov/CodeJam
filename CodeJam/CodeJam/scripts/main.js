/// <reference path="~\scripts\phaser.js">

define(["phaser", "entities/localPlayer", "entities/remotePlayer"], function (Phaser, localPlayer, remotePlayer) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
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

        layer = game.add.tilemapLayer(0, 0, 800, 600, tileset, map, 0);

        layer.resizeWorld();

        

        var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 200, 'mario');
        player = new localPlayer(playerSprite, game, socket);
    }

    function update() {
        player.update();

        game.physics.collide(player.sprite, layer);
    }

    function render() {
    }
});
