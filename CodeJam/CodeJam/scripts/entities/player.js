define(function() {
    function Player(sprite, game, socket) {
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.maxVelocity.y = 900;
        this.sprite.body.drag.x = 900;
        this.sprite.body.drag.y = 400;
    }

    Player.prototype.update = function () {

        console.log(this.sprite.body.y);
        if (this.sprite.body.y > 200) {
            this.sprite.body.acceleration.y = 0;
            this.sprite.body.y = 200;
        }
        if (this.sprite.body.y < 200) {
            this.sprite.body.acceleration.y += 30;
        }
    };

    return Player;
});
