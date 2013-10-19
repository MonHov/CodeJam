define(function() {
	var pool = {};

	function addPlayer (id, player) {
        pool[id] = player;
        return id;
    }

    function getPlayer (id) {
        if (id in pool) {
            return pool[id];
        }
    }

    function removePlayer (id) {
        if (id in pool) {
            var player = pool[id];
            delete pool[id];
            return player;
        }
    }

    function getAllPlayers() {
        var players = [];
        for (var id in pool) {
            if (pool.hasOwnProperty(id)) {
                players.push(pool[id]);
            }
        }

        return players;
    }

	return {
        addPlayer: addPlayer,
        getPlayer: getPlayer,
        removePlayer: removePlayer,
        getAllPlayers: getAllPlayers
    };
});
