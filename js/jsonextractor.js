var AM = require('./__json/dataAMSpotifyPreveiw.json');
var pitchfork = require('./__json/dataSpotify.json');
var paste = require('./__json/dataPasteSpotifyPreveiw.json');
var cos = require('./__json/dataCOSSpotifyPreveiw.json');
var ADM = require('./__json/dataADMSpotifyPreveiw.json');
var rollingStone = require('./__json/dataRollingSpotifyPreveiw.json');
var timeOut = require('./__json/dataRollingSpotifyPreveiw.json');
var file = 'js/__json/playlist_ID.json';
var jf = require('jsonfile');

// console.log(ADM.artists[0].Id);

var ids = [];


function idArray(json){
	for(i = 0; i < json.artists.length; i++){
		if(json.artists[i].Id != undefined){
			ids.push(json.artists[i].Id)
		}
	}
}

idArray(AM);
idArray(pitchfork);
idArray(paste);
idArray(cos);
idArray(ADM);
idArray(rollingStone);
idArray(timeOut);
console.log(ids.length);
console.log(ids);

jf.writeFile(file, ids, function(err) {
	console.log("this is not working", err)
})

