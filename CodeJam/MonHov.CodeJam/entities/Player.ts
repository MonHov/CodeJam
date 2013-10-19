///<reference path="../lib/phaser.d.ts"/>

class Player {

    game: Phaser.Game;
    sprite: Phaser.Sprite;
    id: number;
    name: string;

    keyboard: Phaser.Keyboard;
    // array of status effects

    constructor(sprite: Phaser.Sprite, game: Phaser.Game) {
        this.game = game;
        this.sprite = sprite;
        //this.sprite.height = 32;
        //this.sprite.width = 32;
        this.sprite.maxVelocity.x = 250;
        this.sprite.drag.x = 900;
        this.keyboard = game.input.keyboard;
    }

    update() {
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
    }
}