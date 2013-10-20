define(["entities/player", "phaser"], function (player, Phaser) {

    function LocalPlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;
    }

    LocalPlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.acceleration.x += 100;
            this.sprite.scale.x = -1;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.acceleration.x = 0;
        }
        if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.body.acceleration.x -= 30;
            this.sprite.scale.x = 1;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP))
        {
            if (this.sprite.body.touching.down) {              
                if (Math.abs(this.sprite.body.velocity.x) >= this.sprite.body.maxVelocity.x - 15) {
                    console.log("turbo jump");
                    this.sprite.body.velocity.y = -500;
                } else {
                    this.sprite.body.velocity.y = -450;
                }
            }
        }
    };

    return LocalPlayer;
});
