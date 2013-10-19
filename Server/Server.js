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

var gameServer = {};
gameServer.fake_latency = 0;
gameServer.local_time = 0;
gameServer._dt = new Date().getTime();
gameServer._dte = new Date().getTime();
    //a local queue of messages we delay if faking latency
gameServer.messages = [];

setInterval(function(){
    gameServer._dt = new Date().getTime() - gameServer._dte;
    gameServer._dte = new Date().getTime();
    gameServer.local_time += gameServer._dt/1000.0;
}, 4);


var playerCount = 0;
var playerIds = [];

io.sockets.on('connection', function (socket) {

	socket.userid = uuid();
	socket.emit("gamejoin",{id:socket.userid,otherIds:playerIds});
	
	console.log(playerIds);
	playerIds.push(socket.userid);
	
	
	//clients call this...
	//this.socket.emit("playermove", {
    //        id: this.id,
    //        x: this.sprite.body.x,
    //        y: this.sprite.body.y
    //    });

    socket.on('playermove', function (data) {
        io.sockets.emit('playermove', data);
    });

    socket.on('playerjoin', function (data) {
		console.log('\t socket.io:: client connected ' + socket.userid );
		io.sockets.emit("playerjoin", {id:socket.userid});
		playerCount++;
    });
	
	socket.on('disconnect', function (data) {
		console.log('\t socket.io:: client disconnected ' + socket.userid );
		io.sockets.emit("playerleave", {id:socket.userid});
		//playerIds.splice(playerIds.indexOf(socket.userid),1);
		playerCount--;
	});

	socket.on('playerjumpedon', function (data) {
	    io.sockets.emit("playerdied", { id: data.jumpedonid });
	});
	
});