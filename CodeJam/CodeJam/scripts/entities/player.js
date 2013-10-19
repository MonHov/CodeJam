define(function() {
    function Player(sprite, game, socket) {
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;

        //this.sprite.width = 32;
        //this.sprite.height = 32;

        this.sprite.body.collideWorldBounds = true;

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.maxVelocity.y = 1200;
        this.sprite.body.drag.x = 900;
        this.sprite.body.gravity.y = 9;

        //this.sprite.body.bounce.setTo(0.5, 0.5);

        //this.sprite.anchor.setTo(0.5, 0.5);

        this.sprite.body.setSize(32, 32, 0, 0);

        //this.sprite.body.drag.y = -100;
    }

    Player.prototype.update = function () {
    };

    return Player;
});
