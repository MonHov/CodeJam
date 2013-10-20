define(["entities/player", "phaser"], function (player, Phaser) {

    function LocalPlayer(sprite, game) {
        player.apply(this, arguments);

        this.sprite.body.maxVelocity.x = 250;
        this.sprite.body.maxVelocity.y = 900;
        this.sprite.body.drag.x = 900;
        this.sprite.body.gravity.y = 12;
        this.sprite.body.bounce.y = .02;

        this.fireRate = 200;
        this.nextFire = 0;

        this.keyboard = game.input.keyboard;

        this.jumpTimer = 0;
    }

    LocalPlayer.prototype.update = function(position) {
        player.prototype.update.apply(this, position);

        mouseX = this.game.input.x; mouseY = this.game.input.y;

        if (mouseX > this.sprite.body.x) {
            this.sprite.scale.x = 1;
        } else {
            this.sprite.scale.x = -1;
        }

        this.sprite.body.velocity.x = 0;

        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D)) {
            this.sprite.body.velocity.x = 225;
            this.sprite.animations.play('walk', 15, false);
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT) || this.keyboard.justReleased(Phaser.Keyboard.D)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A)) {
            this.sprite.body.velocity.x = -225;
            this.sprite.animations.play('walk', 15, false);
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT) || this.keyboard.justReleased(Phaser.Keyboard.A)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.keyboard.isDown(Phaser.Keyboard.W)) {
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

        return {
            id: this.id,
            x: this.sprite.body.x,
            y: this.sprite.body.y,
            scale: this.sprite.scale.x
        };
    };

    return LocalPlayer;
});
