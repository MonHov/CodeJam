define(["entities/player"], function (player) {

    function RemotePlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;
    }

    RemotePlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (position) {
            this.sprite.x = position.x;
            this.sprite.y = position.y;
        }
    };

    return RemotePlayer;
     
});
