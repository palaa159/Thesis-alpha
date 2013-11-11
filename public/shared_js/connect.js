var time;
var socket = io.connect('http://localhost:3001'); // connect client to the server
socket.on('greet', function(data) {
	time = data.time;
	console.log(time);
});