///<reference path="../lib/phaser.d.ts"/>

class Player {

    socket: Object;
    game: Phaser.Game;
    sprite: Phaser.Sprite;
    id: number;
    name: string;


    isJumping: bool;

    keyboard: Phaser.Keyboard;
    // array of status effects

    constructor(sprite: Phaser.Sprite, game: Phaser.Game, socket: Object) {
        this.socket = socket;
        this.game = game;
        this.sprite = sprite;
        //this.sprite.height = 32;
        //this.sprite.width = 32;
        this.sprite.maxVelocity.x = 250;
        this.sprite.drag.x = 900;
    }

    update(position?) {
        
    }
}