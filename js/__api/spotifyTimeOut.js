var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({});

var parsedJSON = require('./__json/TimeOutData.json');
var file = 'js/__json/dataSpotifyTime.json';
var jf = require('jsonfile');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

spotifyInfo = {}
spotifyInfo["Artists"] = []
spotifyInfo["ArtistName"] = []
spotifyInfo["preveiwURL"] = []
spotifyInfo["previewName"] = []

for (var i = 0; i < parsedJSON.artists.length; i++) {

//console.log('this', parsedJSON);
    spotifyApi.searchArtists(parsedJSON.artists[i].artist)
        .then(function(data) {



            spotifyInfo.Artists.push(data.body.artists.items[0].id);
            spotifyInfo.ArtistName.push(data.body.artists.items[0].name);
			
			
            localStorage.setItem('SpotifyStuff', JSON.stringify(spotifyInfo));
            console.log(i, spotifyInfo.ArtistName);


        }, function(err) {
            console.error(err);

        });
}

//First parsed object from first spotify loop Saved to local storage 

var receivedObject = localStorage.getItem('SpotifyStuff');
var receivedParse = JSON.parse(receivedObject);
console.log('recievedPArse ', receivedParse)


for (var i = 0; i < parsedJSON.artists.length; i++) {
    spotifyApi.getArtistTopTracks(receivedParse.Artists[i], 'GB')
        .then(function(data) {
			for (var j = 0; j < parsedJSON.artists.length; j++) {
	        //console.log('this', data.body.tracks[j].artists[0].name);
	        //console.log('this2', receivedParse.ArtistName[j]);
			if (receivedParse.ArtistName[j] == data.body.tracks[j].artists[0].name) {
				//console.log(receivedParse.ArtistName[j], data.body.tracks[j].artists[0].name);
			//console.log(receivedParse.ArtistName[j], data.body.tracks[j].preview_url);	
            spotifyInfo.preveiwURL.push(data.body.tracks[j].preview_url);
            spotifyInfo.previewName.push(data.body.tracks[j].artists[0].name);
            localStorage.setItem('SpotifyPreveiw', JSON.stringify(spotifyInfo));
            }
			}
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}




var receivedObjectPreveiw = localStorage.getItem('SpotifyPreveiw');
var recObPreParse = JSON.parse(receivedObjectPreveiw);

//console.log(recObPreParse);

for (var i = 0; i < parsedJSON.artists.length; i++) {
    for (var j = 0; j < receivedParse.ArtistName.length; j++) {
	     if (parsedJSON.artists[i].artist == receivedParse.previewName[j]) {
	        parsedJSON.artists[i].previewURL = recObPreParse.preveiwURL[j];
        }
        if (parsedJSON.artists[i].artist == receivedParse.ArtistName[j]) {
            parsedJSON.artists[i].Id = receivedParse.Artists[j];
            parsedJSON.artists[i].Spotnames = receivedParse.ArtistName[j];
        }
   
    }
}



console.log(parsedJSON)


//write to json
jf.writeFile(file, parsedJSON, function(err) {
    console.log("this is not working", err)
}) 

localStorage.clear();