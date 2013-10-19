define(["entities/player", "phaser"], function (player, Phaser) {

    function LocalPlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;
    }

    LocalPlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.acceleration.x += 100;
            //this.sprite.flipped = true;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.acceleration.x = 0;
        }
        if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.body.acceleration.x -= 30;
            //this.sprite.flipped = false;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP)) {
            if (this.sprite.body.y > 199 && this.sprite.body.y < 201) {
                this.sprite.body.acceleration.y = -1000;
            }
        }
    };

    return LocalPlayer;
});
