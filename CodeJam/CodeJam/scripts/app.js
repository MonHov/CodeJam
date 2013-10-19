
requirejs.config({
    "baseUrl": "scripts",
    "shim": {
        "phaser": { exports: "Phaser" }
    },
});

requirejs(["main"]);