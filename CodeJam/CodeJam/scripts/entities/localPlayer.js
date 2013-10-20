define(["entities/player", "managers/projectileManager", "phaser"], function (player, ProjectileManager, Phaser) {

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

        this.canWallJump = true;
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

        if (!this.canWallJump && this.sprite.body.touching.down) {
            this.canWallJump = true;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D)) {
            this.sprite.body.velocity.x = 225;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT) || this.keyboard.justReleased(Phaser.Keyboard.D)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A)) {
            this.sprite.body.velocity.x = -225;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT) || this.keyboard.justReleased(Phaser.Keyboard.A)) {
            this.sprite.body.acceleration.x = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.keyboard.isDown(Phaser.Keyboard.W)) {

            if (this.game.time.now > this.jumpTimer && this.sprite.body.touching.down) {
                this.jumpTimer = this.game.time.now + 600;                
                
                if (Math.abs(this.sprite.body.velocity.x) >= this.sprite.body.maxVelocity.x - 15) {
                    console.log("turbo jump");
                    this.sprite.body.velocity.y = -550;
                } else {
                    this.sprite.body.velocity.y = -500;
                }
            }
            else if (this.canWallJump && (this.sprite.body.touching.left || this.sprite.body.touching.right)) {
                this.canWallJump = false;
                this.sprite.body.velocity.y = -350;
            }
        }

        if (Math.abs(this.sprite.body.velocity.x) > 10) {
            this.sprite.animations.play('walk', 15, false);
        }else{
            this.sprite.animations.play('idle', 1, true);
        }

        if (this.game.input.activePointer.isDown) {
            this.fire();
        }

        return {
            id: this.id,
            x: this.sprite.body.x,
            y: this.sprite.body.y,
            scale: this.sprite.scale.x
        };
    };

    LocalPlayer.prototype.fire = function () {
        if (this.isDead) return;
        var projectileGroup = ProjectileManager.getPool();

        if (this.game.time.now > this.nextFire && projectileGroup.countDead() > 0) {
            this.nextFire = this.game.time.now + this.fireRate;

            mouseX = this.game.input.x;
            mouseY = this.game.input.y;

            var offSetX = 20 * this.sprite.scale.x;

            var startX = this.sprite.x + offSetX;
            var startY = this.sprite.y;

            //calculate a vector based on mouse location         
            var rot = this.game.physics.angleToPointer({ x: startX, y: startY });

            ProjectileManager.createProjectile(startX, startY, rot, this.id, true);
        }
    };

    return LocalPlayer;
});
