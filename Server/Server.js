
var io = require('socket.io').listen(80);

var playerCount = 0;

io.sockets.on('connection', function (socket) {
    
    socket.on('playermove', function (data) {
        io.sockets.emit('playermove', data);
    });

    socket.on('playerjoin', function (data) {
        if (playerCount) {
            socket.emit('status', 'observer');
        }
        else {
            socket.emit('status', 'player');
        }

        playerCount++;
    });
});