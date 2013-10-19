define(["entities/player", "phaser"], function (player, Phaser) {

    function LocalPlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.keyboard = game.input.keyboard;

        this.jumpTimer = 0;
    }

    LocalPlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        this.sprite.body.velocity.x = 0;
        //this.sprite.body.velocity.y = 0;

        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D)) {
            this.sprite.body.velocity.x = 150;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D)) {
            this.sprite.body.acceleration.x = 0;
        }
        if (this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A)) {
            this.sprite.body.velocity.x = -150;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //if (this.sprite.body.touching.down) {
            if (this.game.time.now > this.jumpTimer) {
                this.sprite.body.velocity.y = -600;
                this.jumpTimer = this.game.time.now + 900;
            }
        }
    };

    return LocalPlayer;
});
