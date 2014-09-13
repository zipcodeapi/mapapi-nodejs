/** Copyright Redline13, LLC */

// Require http
var http = require("http");

/** Reline13 Map API */
function Redline13MapApi(mapId, key) {
	this.mapId = mapId;
	this.key = key;
	this.host = "localhost";
	this.port = 4434;
}

/** Send points */
Redline13MapApi.prototype.sendPoints = function(points, callback)
{
	var that = this;
	
	// Send POST request
	var postData = JSON.stringify({
		mapId: this.mapId,
		key: this.key,
		points: points
	});
	var postOpts = {
		host: this.host,
		port: this.port,
		path: '/',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': postData.length
		}
	};
	var postReq = http.request(postOpts, function(res) {
		res.setEncoding('utf8');
		var respStr = "";
		res.on('data', function (chunk) {
			respStr += chunk;
		});
		res.on('data', function (chunk) {
			//console.log('Response: ' + respStr);
			
			// Call callback
			if (callback)
				callback.call(that, null);
		});
	});
	// Handle error
	postReq.on("error", function(err) {
		console.log(err);
		
		// Call callback
		if (callback)
			callback.call(that, err);
	});
	// Set 10 second timeout
	postReq.on('socket', function (socket) {
		socket.setTimeout(10000);  
		socket.on('timeout', function() {
			postReq.abort();
		});
	});
	postReq.write(postData);
	postReq.end();
};

module.exports = Redline13MapApi;
