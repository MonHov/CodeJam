define(function() {
    function Player(sprite, game, socket) {
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.drag.x = 900;
    }

    Player.prototype.update = function() {};

    return Player;
});
