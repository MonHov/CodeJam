define(["entities/player"], function (player) {

    function RemotePlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;
    }

    RemotePlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (position) {
            var t = this.game.add.tween(this.sprite).to({ x: position.x, y: position.y}, 50, Phaser.Easing.Quartic.InOut);
            t.start();
            //this.sprite.x = position.x;
            //this.sprite.y = position.y;
        }
    };

    return RemotePlayer;
     
});
