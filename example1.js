// Require http
var RealTimeMapApi = require("./realtimemapapi.js");

var mapapi1 = new RealTimeMapApi("btJHjMJb", "LGzCW2LS8SDVn3d6");
var mapapi2 = new RealTimeMapApi("YSc55rfn", "k7vl2nHvCFfN40YT");

var interval = setInterval(function() {
	mapapi1.sendPoints([
		{lat: 29.7628 + (3-3*Math.random()), lng: -95.3831 + (3-3*Math.random()), c: '#ff0000'},
		{lat: 35.7628 + (3-3*Math.random()), lng: -85.3831 + (3-3*Math.random()), r: 10, c: '#ff0000', c2: '#0000ff'},
		{lat: 35.9 + (3-3*Math.random()), lng: -85.7 + (3-3*Math.random()), r: 10},
		{zipcode: 90210}
	]);

	mapapi2.sendPoints([
		{lat: 31 + (3-3*Math.random()), lng: -90 + (3-3*Math.random())},
		{lat: 35 + (3-3*Math.random()), lng: -80 + (3-3*Math.random())},
		{lat: 38 + (3-3*Math.random()), lng: -95 + (3-3*Math.random())}
	]);
}, 250);

setTimeout(function() {
	clearInterval(interval);
}, 10000);
