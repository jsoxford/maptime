var twitter = require('ntwitter'),
	config = require('./config.js'),
	twit = new twitter(config);


/*
	The streaming search parameters, info at:
		https://dev.twitter.com/docs/api/1.1/post/statuses/filter

	Examples:

	UK
		{locations:'-10.371,48.812,2.192,60.892'}

	San Francisco + New York
		{locations:'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}

	Any Geotagged tweet OR one mentioning pizza
		{locations:'-180,-90,180,90'}

	Tweets mentioning pizza or burger
		{track:'pizza,burger'}

*/

var filterParams = {locations:'-10.371,48.812,2.192,60.892'}; // UK

twit.stream('statuses/filter', filterParams, function(stream) {
	stream.on('data', tweetHandler);
});


function tweetHandler(data){

	console.log(data.text);

	if(data.geo){
		console.log("\u001b[31m\t^^ ", data.geo, '\u001b[0m');
	}

}