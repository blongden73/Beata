var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({});
var albumIds = require('./__json/albumIds.json');
var file = 'js/__json/trackIds.json';
var jf = require('jsonfile');

console.log('this', albumIds[0]);

var trackIds = {
	Ids: []
};

for(i = 0; i < 97; i++){
	spotifyApi.getAlbumTracks(albumIds[i], { limit : 1, offset : 1 })
	.then(function(data) {
		console.log('Album tracks', data.body.items[0]);
		var id = data.body.items[0].id;
		trackIds.Ids.push('spotify%3Atrack%3A'+id);
		jf.writeFile(file, trackIds, function(err) {
			console.log("this is not working", err)
		})
		}, function(err) {
		console.error(err);
	});
}

