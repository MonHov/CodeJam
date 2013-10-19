
requirejs.config({
    "baseUrl": "scripts",
    "shim": {
        "phaser": {
            exports: "Phaser"
        },
        'socketio': {
          exports: 'io'
        }
    },
    "paths": {
        socketio: "lib/socket.io.min"
    }
});

requirejs(["main"]);
