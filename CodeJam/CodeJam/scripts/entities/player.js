define(function() {
    function Player(sprite, game, socket, id) {
        this.id = id; 
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;

        this.sprite.width = 32;
        this.sprite.height = 64;

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
