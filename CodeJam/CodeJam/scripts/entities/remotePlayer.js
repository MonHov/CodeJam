define(["entities/player"], function (player) {

    function RemotePlayer(sprite, game) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;
        this.sprite.body.immovable = true;
        this.previousPosition = {x:0}; 
    }

    RemotePlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (this.previousPosition.x !== this.sprite.body.x) {
            this.sprite.animations.play('walk', 15, false);
            this.previousPosition.x = this.sprite.body.x;
        }
    };

    return RemotePlayer;
     
});
