define(function() {
    function Player(sprite, game, socket) {
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;

        this.sprite.width = 32;
        this.sprite.height = 32;

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.maxVelocity.y = 900;
        this.sprite.body.drag.x = 900;
        this.sprite.body.gravity.y = 6;
        this.sprite.body.bounce.y = .02;
        this.sprite.anchor.setTo(.5, .5);
    }

    Player.prototype.update = function () {

    };

    return Player;
});
