


define(["phaser", "socketio"], function (Phaser, io) {

    var gameStateCollection = {};

    var socket = null;

    var runningState;

    var GameManager = {};

    GameManager.addState = function (name, gameState) {
        gameStateCollection[name] = gameState;
    };

    GameManager.removeState = function (name) {
        delete gameStateCollection[name];
    };

    GameManager.start = function (name) {
        runningState = new gameStateCollection[name]();

        runningState.join();
    };

    GameManager.end = function () {
        runningState.destroy();
    };

    //GameManager.restart = function () {
    //    GameManager.end();

    //};

    return GameManager;
});


