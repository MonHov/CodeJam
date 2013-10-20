/// <reference path="~\scripts\phaser.js">

define([
    "phaser",
    "entities/localPlayer",
    "entities/remotePlayer",
    "socketio",
    "entities/playerPool"
],
function (Phaser, localPlayer, remotePlayer, io, playerPool) {

    var width = 800;
    var height = 640;

    var game;

    var myPlayer;
    var playerId;
    var otherIds = [];
    var socket = io.connect("http://10.7.1.174:80");

    socket.on("gamejoin", function (data) {
        playerId = data.id;
        otherIds = data.otherIds;
        game = new Phaser.Game(800, 640, Phaser.AUTO, '', {
            preload: init,
            create: create,
            update: update,
            render: render
        });
        console.log(game);
    });

    socket.on("playerjoin", function(data) {
        console.log('someone joined', data);
        createRemotePlayer(data.id);
    });

    socket.on("playermove", function(data) {
        var otherPlayer = playerPool.getPlayer(data.id);
        if (otherPlayer && otherPlayer != myPlayer) {
            otherPlayer.sprite.x = data.x;
            otherPlayer.sprite.y = data.y;
        }
    });

    socket.on("playerleave", function(data) {
        var leftId = data.id;
        var leftPlayer = playerPool.removePlayer(leftId);
        if (leftPlayer) {
            leftPlayer.sprite.destroy();
        }
    });

    var map;
    var tileset;
    var layer;
    var bg;

    function createRemotePlayer (newPlayerId) {
        if (!playerPool.getPlayer(newPlayerId)) {
            var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 180, 'otis-small');
            var newPlayer = new remotePlayer(playerSprite, game, socket, newPlayerId);
            playerPool.addPlayer(newPlayerId, newPlayer);
        }
    }

    function init() {

        game.load.tilemap('desert', 'assets/maps/collision.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tileset('tiles', 'assets/tiles/smb_tiles.png', 16, 16);

        //game.stage.disablePauseScreen = true;
        game.load.image('mario', 'assets/player.mario.png');
        game.load.image('otis-small', 'assets/player.otis.small.png');
    }

    function create() {
        game.stage.backgroundColor = '#93CCEA';

        map = game.add.tilemap('desert');
                
        tileset = game.add.tileset('tiles');

        tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);

        layer = game.add.tilemapLayer(0, 0, 800, 600, tileset, map, 0);

        layer.resizeWorld();

        //var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 200, 'mario');
        var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 180, 'otis-small');

        myPlayer = new localPlayer(playerSprite, game, socket, playerId);
        playerPool.addPlayer(myPlayer.id, myPlayer);
        game.camera.follow(player.sprite);
        socket.emit('playerjoin', {id: myPlayer.id});

        for (var i = 0; i < otherIds.length; i++) {
            createRemotePlayer(otherIds[i]);
        }
    }

    function update() {
        game.physics.collide(myPlayer.sprite, layer);
        myPlayer.update();
    }


    function render() {
    }
});
