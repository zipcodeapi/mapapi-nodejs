/** Copyright: FastZip, LLC */

// Require http
var https = require("https");

/** Real Time Map API */
function RealTimeMapApi(mapId, key) {
	this.mapId = mapId;
	this.key = key;
	this.host = "realtimemapapi.com";
	this.port = 4434;
}

/** Send points */
RealTimeMapApi.prototype.sendPoints = function(points, callback)
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
	var postReq = https.request(postOpts, function(res) {
		res.setEncoding('utf8');
		var respStr = "";
		res.on('data', function (chunk) {
			respStr += chunk;
		});
		res.on('data', function (chunk) {
			//console.log('Response: ' + respStr);

			// Call callback
			if (callback)
				callback.call(that, respStr === "true" ? null : ("Response: " + respStr));
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

module.exports = RealTimeMapApi;
