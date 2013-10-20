
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

window.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode;
    if (keyCode == 32 || (keyCode >= 37 && keyCode <= 40)) {
        e.preventDefault();
    }
});

requirejs(["main"]);
