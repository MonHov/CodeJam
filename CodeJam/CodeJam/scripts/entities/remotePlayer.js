define(["entities/player"], function (player) {

    function RemotePlayer(sprite, game) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;
        this.sprite.body.immovable = true;
    }

    RemotePlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (position) {

        }
    };

    return RemotePlayer;
     
});
