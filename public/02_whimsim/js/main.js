// listening for event data google
var allBytes = 0;
var bytes = 0;
var sW, sH, adjust = 40;
socket.on('data google', function(data) {
	bytes += data.size;
	$('#countBytes').text(bytes);
	$('#countBytes').counter({
		stop: bytes,
		interval: 100
	});
	$('#since').html(moment(time).fromNow() + '. That\'s ' + (bytes/allBytes*100).toFixed(2) + '% of your outgoing traffics.');
});

socket.on('data all', function(data) {
	allBytes += data.size;
});

window.onload = function() {
	sW = window.innerWidth;
	sH = window.innerHeight;
	$('#countBytes').counter({});
	$('#counterContainer').css({
		top: sH/2 - adjust,
		left: sW/2 - $('#counterContainer').width()/2
	});
	$('#gometer').css({
		top:sH/2 - 80 - adjust,
		left:sW/2 - $('#gometer').width()/2
	});
	$('#suffix').css({
		top:sH/2 + 105 - adjust,
		left:sW/2 - $('#suffix').width()/2
	});
};

window.onresize = function() {
	sW = window.innerWidth;
	sH = window.innerHeight;
	$('#counterContainer').css({
		top: sH/2 - adjust,
		left: sW/2 - $('#counterContainer').width()/2
	});
	$('#gometer').css({
		top:sH/2 - 80 - adjust,
		left:sW/2 - $('#gometer').width()/2
	});
	$('#suffix').css({
		top: sH/2 + 105 - adjust,
		left: sW/2 - $('#suffix').width()/2
	});
};