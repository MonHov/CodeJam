///<reference path="../lib/phaser.d.ts"/>
///<reference path="Player.ts"/>

class RemotePlayer extends Player {

    constructor(sprite: Phaser.Sprite, game: Phaser.Game, socket: Object) {
        super(sprite, game, socket);
    }

    update(position?) {
        super.update();

        if (position) {
            this.sprite.x = position.x;
            this.sprite.y = position.y;
        }
    }
}