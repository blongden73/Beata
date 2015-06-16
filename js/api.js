var request = require("request"),
	cheerio = require("cheerio"),
	url = "http://pitchfork.com/reviews/best/albums/";

var jf = require('jsonfile');	
var file = 'js/data.json';
var fs  = require('fs');

	
request(url, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				obj = {};
	obj["provider"] = [{provider : 'Pitchfork'}] ;						
	obj["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
}

//loop through albums list and get individual parts
$("ul.object-list.bnm-list > li").each(function(index){
	var artistName = $(".info h1", this).html().replace("&apos;", "'").replace('&amp;', '&');
	var albumName = $(".info h2", this).html();
	var imageLink = $("a .artwork .lazy", this).data('content').replace(" <img src=\"", "").replace("\" /> ", "");
	var ratingNo = $(".info .score", this).html();
	var sClink = $(".info .reveiw-audio ul li .p4k-player-track", this).data('href');

		obj.artists[index] = new albumInfo(artistName, albumName, imageLink, ratingNo, sClink);
	});
				
			
		console.log(obj.artists[1].image);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	

 		
	//write to json
jf.writeFile(file, obj, function(err) {
	console.log("this is not working", err)
})
	
	
});
