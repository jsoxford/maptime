var ntwitter = require('ntwitter'),
	express = require('express');


// set up nTwitter with the api configuration in ./config.js
var config = require('./config.js'),
	twit = new ntwitter(config);


/*
	The streaming search parameters, info at:
		https://dev.twitter.com/docs/api/1.1/post/statuses/filter

	Examples:

	UK
		{locations:'-10.371,48.812,2.192,60.892'}

	San Francisco + New York
		{locations:'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}

	Any Geotagged tweet
		{locations:'-180,-90,180,90'}

	Tweets mentioning pizza or burger
		{track:'pizza,burger'}

*/
var filterParams = {locations:'-10.371,48.812,2.192,60.892'}; // UK


// usually, you'd access `stream` within the callback context, but 
// for the sake of readability later on - we're relying on the callback
// being called syncronously (which nTwitter does)
var stream;
twit.stream('statuses/filter', filterParams, function(_stream) {
	stream = _stream;
});


/*
	Output every tweet to the console
*/
stream.on('data', function(data){
	console.log(data.text);
});


/*
	Create an express webapp.  This will allow us to serve
	static files in the ./public directory
*/
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000);






