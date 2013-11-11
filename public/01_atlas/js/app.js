var imgWidth = $('#map').width(),
	imgHeight = $('#map').height(),
	cWidth,
	cHeight,
	cContainer = $('#myCanvas'),
	c = $('#myCanvas')[0],
	ctx = c.getContext('2d');

window.addEventListener('load', function() {
	cContainer.attr({
		width: imgWidth,
		height: imgHeight
	});
});

socket.on('sending data', function(data) {
	// ajax for location
	
});

/* ––––––––––––––––––––––
	FUNCTIONS 4 MAPS
 ––––––––––––––––––––––  */
// lon = 0, x = givenWidth/2
// lat = 0, y = givenHeight/2
// lon = -180, x = 0 : lon = 180, x = givenWidth
// lat = -90, y = 0 : lon = 90, y = givenHeight

function getPixel(lat, lon) {
	// return x, y
	x = ((imgWidth * lon) / 360) + imgWidth / 2;
	y = -((imgHeight * lat) / 180) + imgHeight / 2;
	return {
		x: x,
		y: y
	};
}

function moveNode(lat, lon) {
	$('#tpoint').animate({
		top: getPixel(lat, lon).y,
		left: getPixel(lat, lon).x,
	});
	return 'done grabbing x and y!';
}

Number.prototype.toRad = function() {
	return this * (Math.PI / 180);
};

function distKM(point1, point2) { // from http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
	var R = 6371; // km
	var dLat = (point2.y - point1.y).toRad();
	var dLon = (point2.x - point1.x).toRad();
	var lat1 = (point1.y).toRad();
	var lat2 = (point2.y).toRad();

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

function distPixel(point1, point2) {
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt(xs + ys);
}

function drawBezier(s_lat, s_lon, e_lat, e_lon, width, color) {
	var gradient = ctx.createLinearGradient(0, 0, 170, 0);
	gradient.addColorStop("0", "magenta");
	gradient.addColorStop("1.0", "red");

	// Fill with gradient
	ctx.strokeStyle = gradient;
	ctx.lineWidth = width || 1;
	ctx.beginPath();
	// moveTo(x,y);
	ctx.moveTo(getPixel(s_lat, s_lon).x, getPixel(s_lat, s_lon).y);
	// curveTo(handleX, handleY, endX, endY);
	console.log('s: ' + getPixel(s_lat, s_lon).x + ', ' + getPixel(s_lat, s_lon).y);
	console.log('e: ' + getPixel(e_lat, e_lon).x + ', ' + getPixel(e_lat, e_lon).y);
	console.log('d: ' + distPixel(getPixel(s_lat, s_lon), getPixel(e_lat, e_lon)));
	console.log('km: ' + distKM(getPixel(s_lat, s_lon), getPixel(e_lat, e_lon)));
	ctx.quadraticCurveTo((getPixel(s_lat, s_lon).x + getPixel(e_lat, e_lon).x) / 2, (getPixel(s_lat, s_lon).y + getPixel(e_lat, e_lon).y) / 2 - Math.floor(Math.random() * 200 - 100), getPixel(e_lat, e_lon).x, getPixel(e_lat, e_lon).y);
	ctx.stroke();

	return 'just drew bezier';
}