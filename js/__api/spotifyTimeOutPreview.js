var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({});

var parsedJSON = require('./__json/dataTimeSpotify.json');
var file = 'js/__json/dataTimeSpotifyPreveiw.json';
var jf = require('jsonfile');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


//loop through parsed json with spotify ids
for (var i = 0; i < parsedJSON.artists.length; i++) {
	//console.log(parsedJSON.artists[i].Id);

	//make call to spotify api
    spotifyApi.getArtistTopTracks(parsedJSON.artists[i].Id, 'GB')
        .then(function(data) {
	        //loop through to check to see if names match
			for (var j = 0; j < parsedJSON.artists.length; j++) {
				//check to see if names match
				if(parsedJSON.artists[j].artist === data.body.tracks[0].artists[0].name){
					//set preview url
					parsedJSON.artists[j].previewURL = data.body.tracks[0].preview_url;
					console.log(parsedJSON)
					  //write to json
					  	jf.writeFile(file, parsedJSON, function(err) {
							console.log("this is not working", err)
								})

				}
			}
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}
