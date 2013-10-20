define(["entities/player"], function (player) {

    function RemotePlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;
    }

    RemotePlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (position) {
            this.sprite.scale.x = position.scale;
            var t = this.game.add.tween(this.sprite).to({ x: position.x, y: position.y}, 50, Phaser.Easing.Quartic.InOut);
            t.start();
        }
    };

    return RemotePlayer;
     
});
