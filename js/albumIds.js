var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({});
var artistIds = require('./__json/playlist_ID.json');
var file = 'js/__json/albumIds.json';
var jf = require('jsonfile');

console.log('this', artistIds[0]);

var albumIds = [];

for(i = 0; i < artistIds.length; i++){
	spotifyApi.getArtistAlbums(artistIds[i])
	.then(function(data) {
		console.log('Artist albums', data.body.items[0].id);
		var id = data.body.items[0].id;
		albumIds.push(id);
		jf.writeFile(file, albumIds, function(err) {
			console.log("this is not working", err)
		})
		}, function(err) {
		console.error(err);
	});
}

