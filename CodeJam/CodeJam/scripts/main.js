define(["phaser", "entities/localPlayer", "entities/remotePlayer"], function (Phaser, localPlayer, remotePlayer) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: init,
        create: create,
        update: update
    });
    console.log(game);

    var player;
    var socket;

    function init() {
        game.stage.disablePauseScreen = true;
        game.load.image('mario', 'assets/player.mario.png');
    }

    function create() {
        var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 200, 'mario');
        player = new localPlayer(playerSprite, game, socket);
    }

    function update() {
        player.update();
    }
});
