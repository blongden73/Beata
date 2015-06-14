var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.uncut.co.uk/reviews-home";

var jf = require('jsonfile');	
var file = 'js/UncutData.json';

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objTimeOut = {};
	objTimeOut["provider"] = [{provider : 'Uncut'}] ;						
	objTimeOut["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
}

//loop through albums list and get individual parts
$("#keystone-query-widget-id-2 .sections .section-style-grid-large .type-review").each(function(index){
	var artistName = $(".entry-header h2 a", this).html().replace('&#x2013;', '-').replace('&amp;', '&').replace('&#xE9;', 'é');
	var artistNameSplit = artistName.split('-');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1];
	var imageLink = $(".entry-media a img", this).attr('src');
	var ratingNo = $(".out-of-ten .out-of-ten-rating", this).html();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
		objTimeOut.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink);
	});
				
			
		console.log(objTimeOut);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objTimeOut, function(err) {
	console.log("this is not working", err)
})
	
});
