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
        game = new Phaser.Game(800, 640, Phaser.CANVAS, 'game', {
            preload: init,
            create: create,
            update: update,
            render: render
        });
        console.log(game);
    });

    socket.on("playerjoin", function(data) {
        console.log('someone joined', data);
        var player = playerPool.getPlayer(data.id);
        if (!player && player !== myPlayer) {
            createRemotePlayer(data.id);
        }
    });

    socket.on("playermove", function(data) {
        var otherPlayer = playerPool.getPlayer(data.id);
        if (otherPlayer && otherPlayer != myPlayer) {
            //var t = game.add.tween(otherPlayer.sprite).to({ x: data.x, y: data.y }, 25, Phaser.Easing.Quartic.InOut);
            //t.start();
            otherPlayer.sprite.x = data.x;
            otherPlayer.sprite.y = data.y;
            otherPlayer.sprite.scale.x = data.scale;
        }
    });

    socket.on("playerleave", function(data) {
        var leftId = data.id;
        var leftPlayer = playerPool.removePlayer(leftId);
        if (leftPlayer) {
            leftPlayer.sprite.destroy();

            otherPlayerGroup.remove(leftPlayer.sprite);
        }
    });

    socket.on("playerdied", function (data) {

        var leftId = data.id;
        var leftPlayer = playerPool.removePlayer(leftId);
        if (leftPlayer) {
            leftPlayer.sprite.destroy();

            if (myPlayer.id == leftId) {
                myPlayer.isDead = true;
            }

            otherPlayerGroup.remove(myPlayer.sprite);
        }
    });

    var map;
    var tileset;
    var layer;
    var bg;

    var otherPlayerGroup;

    function createRemotePlayer (newPlayerId) {
        if (!playerPool.getPlayer(newPlayerId)) {
            var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 180, 'otis-small');
            var newPlayer = new remotePlayer(playerSprite, game, socket, newPlayerId);
            playerPool.addPlayer(newPlayerId, newPlayer);

            otherPlayerGroup.add(playerSprite);
        }
    }

    function init() {

        otherPlayerGroup = game.add.group();

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

        layer = game.add.tilemapLayer(0, 0, 800, 640, tileset, map, 0);

        layer.resizeWorld();

        //var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 200, 'mario');
        var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 180, 'otis-small');
        myPlayer = new localPlayer(playerSprite, game, socket, playerId);
        playerPool.addPlayer(myPlayer.id, myPlayer);

        game.camera.follow(myPlayer.sprite);

        socket.emit('playerjoin', {id: myPlayer.id});

        for (var i = 0; i < otherIds.length; i++) {
            createRemotePlayer(otherIds[i]);
        }
    }

     
    var b;
    function update() {

        game.physics.collide(myPlayer.sprite, otherPlayerGroup, collisionHandler, null, this);
        game.physics.collide(myPlayer.sprite, layer);
        myPlayer.update();
    }

    function collisionHandler(obj1, obj2) {
        //console.log(obj2);

        player = obj2.player;

        if (myPlayer.sprite.body.y > player.sprite.body.y + 60) {

            player.socket.emit("playermove", {
                jumpedonid: player.id
            });
        }
    }

    function render() {

        if (myPlayer.isDead) {
            game.debug.renderText('you died', 20, 24);
        }

        game.debug.renderSpriteCorners(myPlayer.sprite);

        //for (var player in otherPlayerGroup) {
        //    game.debug.renderSpriteCorners(player);
        //}
    }
});
