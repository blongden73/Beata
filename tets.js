var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({});

// var parsedJSON = require('./__json/dataTimeSpotify.json');
// var file = 'js/__json/dataTimeSpotifyPreveiw.json';
var jf = require('jsonfile');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
// 14dUGRWnPY3jjqpt0k8QRH - playlist
// 2YZyLoL8N0Wb9xBt1NhZWg - song
// 0kL3TYRsSXnu0iJvFO3rud - kendrick


var spotifyApi = new SpotifyWebApi({
  accessToken : 'njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3'
});

// Get tracks in a playlist
spotifyApi.getPlaylistTracks('thelinmichael', '3ktAYNcRHpazJ9qecm3ptn', { 'offset' : 1, 'limit' : 5, 'fields' : 'items' })
  .then(function(data) {
    console.log('The playlist contains these tracks', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

/*
var clientId = '06b26dc80c104d4586bb08c11614856a',
    clientSecret = '079ada45b80d4a83bfe6c6998c982373';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });
  
  

spotifyApi.addTracksToPlaylist('bl118634', '14dUGRWnPY3jjqpt0k8QRH', ["spotify:track:2YZyLoL8N0Wb9xBt1NhZWg", "spotify:track:4M2t7bP4Mq87mGMn0PObUX"])
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
*/


/*
	spotifyApi.getAlbumTracks('0kL3TYRsSXnu0iJvFO3rud', { limit : 5, offset : 1 })
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
*/


/*
ce = require('colour-extractor')
var this_is = "thisisatest";
ce.topColours('imgs/rolling__stone/theneighbourhood.jpeg', true, function (colours) {
  console.log(colours[0][1]);
  r = colours[0][1][0];
  g = colours[0][1][1];
  b =colours[0][1][2];
  calc = r+r+b+g+g+g;
  brightness = calc/6;
  console.log(calc);
  console.log(brightness);

});
*/


/*var image = require('get-image-data')
image('imgs/clash/everythingeverythinggettoheaven.jpeg', function(error, info, callback) {
	  var height = info.height
	  var width = info.width
	  var data = info.data
	  
	  
	  for (var i = 0, l = data.length; i < l; i += 4) {
	    var red = data[i]
	    var green = data[i + 1]
	    var blue = data[i + 2]
	    var alpha = data[i + 3]  
	  }
	  
	  var n = data.length / 2;
	  var m = n + 1;
	  var o = n + 2;
	  
	  var rgba = data[n] + ',' + data[m] + ',' + data[o];
	  savedthing(rgba);
	  })

function savedthing(rgba){
	var newvar = rgba;
	console.log('this', newvar);
}

/*

var getUserName = function( callback ) {            
        // get the username somehow
        var username = "BEn";    
        callback( username );
    };
    var saveUserInDatabase = function( username ) {
        console.log("User: " + username + " is saved successfully.")
        //return username;
        console.log(username);
    };

    getUserName( saveUserInDatabase ); // User: Foo is saved successfully.
    
    //console.log(saveUserInDatabase());
    */