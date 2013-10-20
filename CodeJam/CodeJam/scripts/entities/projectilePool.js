define(function () {
    var pool = {};

    function addProjectile(id, player) {
        pool[id] = player;
        return id;
    }

    function getProjectile(id) {
        if (id in pool) {
            return pool[id];
        }
    }

    function removeProjectile(id) {
        if (id in pool) {
            var player = pool[id];
            delete pool[id];
            return player;
        }
    }

    function getAllProjectiles() {
        var players = [];
        for (var id in pool) {
            if (pool.hasOwnProperty(id)) {
                players.push(pool[id]);
            }
        }

        return players;
    }

    return {
        addProjectile: addProjectile,
        removeProjectile: removeProjectile,
        getProjectile: getProjectile,
        getAllProjectiles: getAllProjectiles
    };
});
