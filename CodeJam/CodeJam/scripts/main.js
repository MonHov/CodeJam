/// <reference path="~\scripts\phaser.js">

define([
    "managers/gamePlayState",
    "managers/gameStateManager"
],
function (GamePlayState, GameStateManager) {

    GameStateManager.addState("gamePlay", GamePlayState);

    GameStateManager.start("gamePlay");
});
