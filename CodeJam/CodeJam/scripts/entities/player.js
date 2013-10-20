define(function() {
    function Player(sprite, game, socket, id) {
        this.id = id; 
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;

        this.sprite.width = 32;
        this.sprite.height = 64;

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.maxVelocity.y = 900;
        this.sprite.body.drag.x = 900;
        this.sprite.body.gravity.y = 12;
        this.sprite.body.bounce.y = .02;
        this.sprite.anchor.setTo(.5, null);

        //network variables
        this.state = "disconnected";
    }

    Player.prototype.update = function () {
    };

    Player.prototype.updateFromStatus = function (status) {
        for (var prop in status) {
            if (status.hasOwnProperty(prop)) {
                this[prop] = status[prop];
            }
        }
    };

    return Player;
});
