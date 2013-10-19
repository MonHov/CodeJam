define(["entities/player", "phaser"], function (player, Phaser) {

    function LocalPlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.maxVelocity.y = 900;
        this.sprite.body.drag.x = 900;
        this.sprite.body.gravity.y = 12;
        this.sprite.body.bounce.y = .02;
        this.sprite.anchor.setTo(.5, null);

        this.keyboard = game.input.keyboard;
    }

    LocalPlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.velocity.x += 100;
            this.sprite.scale.x = -1;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.velocity.x = 0;
        }
        if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.body.velocity.x -= 30;
            this.sprite.scale.x = 1;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT)) {
            this.sprite.body.velocity.x = 0;
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

        this.socket.emit("playermove", {
            id: this.id,
            x: this.sprite.body.x,
            y: this.sprite.body.y
        });

    };

    return LocalPlayer;
});
