
define(["phaser",
    "managers/networkManager",
    "entities/playerPool",
    "entities/localPlayer",
    "entities/remotePlayer",
    "entities/projectilePool"],
function (Phaser, NetworkManager, PlayerPool, LocalPlayer, RemotePlayer, ProjectilePool) {
    
    function GamePlayState() {
        NetworkManager.connect();
    };

    GamePlayState.prototype.join = function () {
        // Register network functions
        NetworkManager.playerJoin(this.playerJoin.bind(this));

        NetworkManager.playerMove(this.playerMove.bind(this));

        NetworkManager.playerLeave(this.playerLeave.bind(this));

        NetworkManager.newProjectile(this.newProjectile.bind(this));

        NetworkManager.playerDied(this.playerDied.bind(this));
        
        NetworkManager.join(function (data) {

            this.playerId = data.id;
            this.otherIds = data.otherIds;

            var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game', {
                preload: this.init.bind(this),
                create: this.create.bind(this),
                update: this.update.bind(this),
                render: this.render.bind(this)
            });

            this.game = game;

        }.bind(this));
    };

    GamePlayState.prototype.init = function () {
        var game = this.game;

        this.otherPlayerGroup = game.add.group();
        this.projectileGroup = game.add.group();

        game.load.tilemap('desert', 'assets/maps/collision.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tileset('tiles', 'assets/tiles/smb_tiles.png', 16, 16);

        //game.stage.disablePauseScreen = true;
        game.load.image('mario', 'assets/player.mario.png');
        game.load.image('otis-small', 'assets/player.otis.small.png');

        //load the projectile
        game.load.image('projectile', 'assets/projectile.png');

    };

    GamePlayState.prototype.create = function () {
        var game = this.game;

        game.stage.backgroundColor = '#93CCEA';

        this.map = game.add.tilemap('desert');

        this.projectileGroup.createMultiple(50, 'projectile');
        this.projectileGroup.setAll('anchor.x', 0.5);
        this.projectileGroup.setAll('anchor.y', 0.5);
        this.projectileGroup.setAll('outOfBoundsKill', true);

        this.tileset = game.add.tileset('tiles');

        this.tileset.setCollisionRange(0, this.tileset.total - 1, true, true, true, true);

        this.layer = game.add.tilemapLayer(0, 0, 800, 640, this.tileset, this.map, 0);

        this.layer.resizeWorld();

        //var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 200, 'mario');
        var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 180, 'otis-small');
        this.localPlayer = new LocalPlayer(playerSprite, game, this.playerId);
        PlayerPool.addPlayer(this.playerId, this.localPlayer);

        game.camera.follow(this.localPlayer.sprite);

        NetworkManager.broadcastPlayerJoin(this.playerId);

        for (var i = 0; i < this.otherIds.length; i++) {
            this.createRemotePlayer(this.otherIds[i]);
        }
    };

    GamePlayState.prototype.createRemotePlayer = function (newPlayerId) {
        var game = this.game;

        if (!PlayerPool.getPlayer(newPlayerId)) {
            var playerSprite = game.add.sprite(game.stage.width * 0.5 - 50, 180, 'otis-small');
            var newPlayer = new RemotePlayer(playerSprite, game, newPlayerId);
            PlayerPool.addPlayer(newPlayerId, newPlayer);

            this.otherPlayerGroup.add(playerSprite);
        }
    }


    GamePlayState.prototype.update = function () {
        var game = this.game;

        if (this.otherPlayerGroup) {
            game.physics.collide(this.localPlayer.sprite, this.otherPlayerGroup, playersCollideWithPlayer, null, this);
        }

        game.physics.collide(this.localPlayer.sprite, this.layer);
        
        game.physics.collide(this.localPlayer.sprite, this.projectileGroup, this.bulletHandler.bind(this), null, this);

        if (game.input.activePointer.isDown) {
            playerClick(this);
        }

        var playerData = this.localPlayer.update();

        NetworkManager.broadcastPlayerMove(playerData);
    };

    GamePlayState.prototype.bulletHandler = function(_player, _bullet) {
        player = _player;
        if (player.id == _bullet.id)
            return;

        _bullet.kill();
        player.sprite.velocity.x = 0;
        player.sprite.velocity.y = 0;
        ProjectilePool.removeProjectile(_bullet);
    }

    function playerClick(gamePlayState) {
        var game = gamePlayState.game;

        if (game.time.now > gamePlayState.localPlayer.nextFire && gamePlayState.projectileGroup.countDead() > 0) {
            gamePlayState.localPlayer.nextFire = game.time.now + gamePlayState.localPlayer.fireRate;

            mouseX = game.input.x;
            mouseY = game.input.y;

            var offSetX = -30 * gamePlayState.localPlayer.sprite.scale.x;
            var offSetY = 10 - (gamePlayState.localPlayer.sprite.body.height / 2);

            if (mouseY > gamePlayState.localPlayer.sprite.y)
                offSetY = 10;

            var startX = gamePlayState.localPlayer.sprite.x + offSetX;
            var startY = gamePlayState.localPlayer.sprite.y + offSetY;

            var bullet = gamePlayState.projectileGroup.getFirstDead();

            bullet.reset(startX, startY);
            var rot = game.physics.moveToPointer(bullet, 600);

            NetworkManager.broadcastProjectile({
                shooter: gamePlayState.localPlayer.id,
                startX: startX,
                startY: startY,
                rotation: rot
            });

            ProjectilePool.addProjectile(bullet);
        }
    }

    function playersCollideWithPlayer(obj1, obj2) {
        //console.log(obj2);
        myPlayer = obj1.player;
        player = obj2.player;

        if (myPlayer.sprite.body.y < (player.sprite.body.y - (player.sprite.body.height / 2))) {

            console.log(myPlayer.sprite.body.y, player.sprite.body.y);

            NetworkManager.broadcastPlayerJumpedOn(player.id);
        }
    }

    GamePlayState.prototype.render = function () {
        var game = this.game;

        if (this.localPlayer.isDead) {
            game.debug.renderText('you died', 20, 24);
        }
    };

    GamePlayState.prototype.playerJoin = function (joinedPlayerInfo) {
        console.log('someone joined', joinedPlayerInfo);
        var player = PlayerPool.getPlayer(joinedPlayerInfo.id);
        if (!player && player !== this.localPlayer) {
            this.createRemotePlayer(joinedPlayerInfo.id);
        }
    };

    GamePlayState.prototype.playerMove = function (playerMovementInfo) {
        var otherPlayer = PlayerPool.getPlayer(playerMovementInfo.id);
        if (otherPlayer && otherPlayer != this.localPlayer) {
            //var t = game.add.tween(otherPlayer.sprite).to({ x: data.x, y: data.y }, 25, Phaser.Easing.Quartic.InOut);
            //t.start();
            otherPlayer.sprite.x = playerMovementInfo.x;
            otherPlayer.sprite.y = playerMovementInfo.y;
            otherPlayer.sprite.scale.x = playerMovementInfo.scale;
        }
    };

    GamePlayState.prototype.playerLeave = function (playerInfo) {
        var leftId = playerInfo.id;
        var leftPlayer = PlayerPool.removePlayer(leftId);
        if (leftPlayer) {
            this.otherPlayerGroup.remove(leftPlayer.sprite);
            leftPlayer.sprite.destroy();
        }
    };

    GamePlayState.prototype.newProjectile = function (projectileInfo) {
        var shooter = projectileInfo.shooter;
        if (shooter == this.localPlayer.id)
            return;

        var startX = projectileInfo.startX;
        var startY = projectileInfo.startY;
        var rotation = projectileInfo.rotation;
        createBullet(startX, startY, rotation, this);
    };

    function createBullet(x, y, rot, gamePlayState) {
        var bullet = gamePlayState.projectileGroup.getFirstDead();
        bullet.reset(x, y);
        bullet.rotation = rot;
        bullet.body.velocity.x = 600;
        ProjectilePool.addProjectile(bullet);
    }

    GamePlayState.prototype.playerDied = function (playerInfo) {
        var killedId = playerInfo.id;
        var killedPlayer = PlayerPool.removePlayer(killedId);

        killPlayer(killedPlayer, killedId, this);
    };

    function killPlayer(killedPlayer, killedId, gamePlayState) {
        if (killedPlayer) {
            killedPlayer.sprite.destroy();

            if (gamePlayState.localPlayer.id == killedId) {
                gamePlayState.localPlayer.isDead = true;
            }

            gamePlayState.otherPlayerGroup.remove(killedPlayer.sprite);
        }
    }

    GamePlayState.prototype.destroy = function () {
        game.destroy();
        NetworkManager.disconnect();
    };

    return GamePlayState;
});