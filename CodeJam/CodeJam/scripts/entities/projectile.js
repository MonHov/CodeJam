define(function () {
    function Projectile(sprite, game, socket, id) {
        this.id = id;
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;
        this.sprite.player = this;
        this.angle = 90;
        this.sprite.body.drag.x = 100;
        this.sprite.body.drag.y = 200;
        this.sprite.gravity = 1;

        //this.sprite.body.collideWorldBounds = true;
        this.sprite.width = 24;
        this.sprite.height = 16;
        this.sprite.anchor.setTo(.5, .5);
    }

    Player.prototype.update = function () {

    };

    return Player;
});
