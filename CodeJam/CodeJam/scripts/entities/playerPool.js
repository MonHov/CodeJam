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

	return {
        addPlayer: addPlayer,
        getPlayer: getPlayer,
        removePlayer: removePlayer
    };
});
