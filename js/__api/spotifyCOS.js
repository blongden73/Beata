var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({});

var parsedJSON = require('./__json/COSData.json');
var file = 'js/__api/__json/dataCOSSpotify.json';
var jf = require('jsonfile');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

//console.log(parsedJSON);
console.log(parsedJSON.artists[2].artist);


//loop through data from website
for (var i = 0; i < parsedJSON.artists.length; i++) {
	//make call to spotify 
    spotifyApi.searchArtists(parsedJSON.artists[i].artist)
        .then(function(data) {
	        //loop through paresed json to check if names match
	        for (var j = 0; j < parsedJSON.artists.length; j++) {
		        //check to see if the names match
		        if(parsedJSON.artists[j].artist === data.body.artists.items[0].name){
			        console.log(parsedJSON.artists[j].artist , data.body.artists.items[0].name);
			        //set names and ids from spotify
			        parsedJSON.artists[j].Id = data.body.artists.items[0].id;
					parsedJSON.artists[j].Spotnames = data.body.artists.items[0].name; 
					console.log(parsedJSON);
					//write to json
					jf.writeFile(file, parsedJSON, function(err) {
					console.log("this is not working", err)
					})
		        }        
			}
        }, function(err) {
            console.error(err);

        });
        }