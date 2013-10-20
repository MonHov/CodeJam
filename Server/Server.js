var io = require('socket.io').listen(80);
var uuid = require('node-uuid');

io.configure(function(){
	//https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
	io.enable('browser client minification');  // send minified client
	io.enable('browser client etag');          // apply etag caching logic based on version number
	io.enable('browser client gzip');          // gzip the file
	io.set('log level', 1);                    // reduce logging

	// enable all transports (optional if you want flashsocket support, please note that some hosting
	// providers do not allow you to create servers that listen on a port different than 80 or their
	// default port)
	io.set('transports', [
		'websocket'
	//, 'flashsocket'
	  , 'htmlfile'
	  , 'xhr-polling'
	  , 'jsonp-polling'
	]);

	io.set('log level', 0);
});

var playerCount = 0;
var playerIds = [];

io.sockets.on('connection', function (socket) {

	socket.userid = uuid();
	socket.emit("gamejoin",{id:socket.userid,otherIds:playerIds});
	
	//console.log(playerIds);
	playerIds.push(socket.userid);

    socket.on('playermove', function (data) {
        io.sockets.emit('playermove', data);
    });
	
	socket.on('newprojectile', function (data) {
        io.sockets.emit('newprojectile', data);
		//console.log('\t CodeJam: New Projectile ' + data.projectile.id );
    });

    socket.on('playerjoin', function (data) {
		io.sockets.emit("playerjoin", {id:socket.userid});
		playerCount++;
		console.log('\t CodeJam: Player Joined ' + socket.userid );
    });
	
	socket.on('disconnect', function (data) {
		io.sockets.emit("playerleave", {id:socket.userid});
		playerIds.splice(playerIds.indexOf(socket.userid),1);
		playerCount--;
		console.log('\t CodeJam: Player Disconnected ' + socket.userid );
	});

	socket.on('playerjumpedon', function (data) {
	    io.sockets.emit("playerdied", { id: data.jumpedonid });
		console.log('\t CodeJam: Jumped On! ' + socket.userid );
	});
});