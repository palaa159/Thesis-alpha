var IP;
$(document).ready(function() {
	$.getJSON("http://smart-ip.net/geoip-json?callback=?",
		function(data) {
			IP = data.host;
			console.log(data.host);
		}
	);
});

$('#accept').click(function() {
	socket.emit('user comply', IP);
	$('#container').html('<h1>Thank you. Now you can close this window.</h1>');
});