define(function() {
    function Player(sprite, game, id) {
        this.id = id; 
        this.game = game;
        this.sprite = sprite;
        this.sprite.player = this;

        this.sprite.body.collideWorldBounds = true;
        this.sprite.width = 32;
        this.sprite.height = 32;

        this.sprite.anchor.x = 0.5;

        this.isDead = false;

        //network variables
        this.state = "disconnected";
    }

    Player.prototype.update = function () {
    };
    
    return Player;
});
