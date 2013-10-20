define(["entities/player", "phaser"], function (player, Phaser) {

    function LocalPlayer(sprite, game, socket) {
        player.apply(this, arguments);

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.maxVelocity.y = 900;
        this.sprite.body.drag.x = 900;
        this.sprite.body.gravity.y = 12;
        this.sprite.body.bounce.y = .02;


        this.keyboard = game.input.keyboard;

        this.jumpTimer = 0;
    }

    LocalPlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        this.sprite.body.velocity.x = 0;

        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D)) {
            this.sprite.body.velocity.x = 225;
            this.sprite.scale.x = -1;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D)) {
            this.sprite.body.acceleration.x = 0;
        }
        if (this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A)) {
            this.sprite.body.velocity.x = -225;
            this.sprite.scale.x = 1;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //if (this.sprite.body.touching.down) {
            if (this.game.time.now > this.jumpTimer && this.sprite.body.touching.down) {
                //this.sprite.body.velocity.y = -600;
                this.jumpTimer = this.game.time.now + 600;                
                
                if (Math.abs(this.sprite.body.velocity.x) >= this.sprite.body.maxVelocity.x - 15) {
                    console.log("turbo jump");
                    this.sprite.body.velocity.y = -550;
                } else {
                    this.sprite.body.velocity.y = -500;
                }
            }
        }

        this.socket.emit("playermove", {
            id: this.id,
            x: this.sprite.body.x,
            y: this.sprite.body.y,
            scale: this.sprite.scale.x
        });

    };

    return LocalPlayer;
});
