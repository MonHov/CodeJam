
define(["managers/networkManager"], function (NetworkManager) {

    var projectilePool = [];
    var projectileGroup;

    var ProjectileManager = {};

    ProjectileManager.createProjectile = function (x, y, rot, playerID, isLocal) {

        var bullet = this.projectileGroup.getFirstDead();
        bullet.reset(x, y);
        bullet.body.velocity.x = 600;
        bullet.body.rotation = rot;

        if (isLocal) {
            NetworkManager.broadcastProjectile({
                shooter: playerID,
                startX: x,
                startY: y,
                rotation: rot
            });
        }
    };

    ProjectileManager.createPool = function (projectileGroup) {
        this.projectileGroup = projectileGroup;

        this.projectileGroup.createMultiple(200, 'projectile');
        this.projectileGroup.setAll('anchor.x', 0.5);
        this.projectileGroup.setAll('anchor.y', 0.5);
        this.projectileGroup.setAll('outOfBoundsKill', true);
        this.projectileGroup.setAll('immovable', true);
    };

    ProjectileManager.getPool= function () {
        return this.projectileGroup;
    };

    ProjectileManager.removeProjectile = function () {
        //this.projectilePool
    };

    return ProjectileManager;
});


