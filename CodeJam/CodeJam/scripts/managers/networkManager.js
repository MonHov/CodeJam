
define(["socketio"], function (io) {

    var socket = null;

    var NetworkManager = {};

    NetworkManager.connect = function () {

        socket = io.connect("http://10.7.1.174:80");

    };

    NetworkManager.join = function (onSuccess) {
        socket.on("gamejoin", onSuccess);

        socket.emit("gamejoin");
    };

    NetworkManager.broadcastPlayerJoin = function (playerId) {
        socket.emit("playerjoin", { id: playerId });
    };

    NetworkManager.playerJoin = function (onSuccess) {
        socket.on("playerjoin", onSuccess);
    };

    NetworkManager.playerMove = function (onSuccess) {
        socket.on("playermove", onSuccess);
    };

    NetworkManager.playerLeave = function (onSuccess) {
        socket.on("playerleave", onSuccess);
    };

    NetworkManager.newProjectile = function (onSuccess) {
        socket.on("newProjectile", onSuccess);
    };

    NetworkManager.removeProjectile = function (onSuccess) {
        socket.on("removeProjectile", onSuccess);
    };

    NetworkManager.playerDied = function (onSuccess) {
        socket.on("playerdied", onSuccess);
    };

    NetworkManager.broadcastPlayerMove = function (movementData) {
        socket.emit("playermove", movementData);
    };

    NetworkManager.broadcastPlayerJumpedOn = function (playerId) {
        socket.emit("playerjumpedon", { jumpedonid: playerId });
    };
    
    NetworkManager.broadcastProjectile = function(projectileInfo) {
        socket.emit("newProjectile", projectileInfo);
    };

    NetworkManager.disconnect = function() {
        socket.disconnect();
    };

    
    return NetworkManager;
});