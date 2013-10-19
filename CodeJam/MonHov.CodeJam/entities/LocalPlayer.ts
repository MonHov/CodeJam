///<reference path="../lib/phaser.d.ts"/>
///<reference path="Player.ts"/>

class LocalPlayer extends Player {

    keyboard: Phaser.Keyboard;

    constructor(sprite: Phaser.Sprite, game: Phaser.Game, socket: Object) {
        super(sprite, game, socket);

        this.keyboard = game.input.keyboard;
    }

    update(position?) {
        super.update();

        // Player controls
        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.acceleration.x += 100;
            this.sprite.flipped = true;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.RIGHT)) {
            this.sprite.acceleration.x = 0;
        }
        if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.acceleration.x -= 30;
            this.sprite.flipped = false;
        } else if (this.keyboard.justReleased(Phaser.Keyboard.LEFT)) {
            this.sprite.acceleration.x = 0;
        }

        socket.emit('playermove', { x: this.sprite.x, y: this.sprite.y });
    }
}