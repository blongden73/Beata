var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://consequenceofsound.net/category/reviews/album-reviews/cos-top-rated/";

var jf = require('jsonfile');	
var file = 'js/COSData.json';

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objCOS = {};
	objCOS["provider"] = [{provider : 'Consequences of Sound'}] ;						
	objCOS["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
}

//loop through albums list and get individual parts
$(".modules-grid #tab-everything .post").each(function(index){
	var artistName = $(".content > h1 > a", this).html().replace('Album Review:', '').replace('&#x2013;', '-').replace('&#xA0;', ' ').replace('&#xF6;','ö');
	var artistSplit = artistName.split('-');
	var artist = artistSplit[0];
	var albumName = artistSplit[1];
	var imageLink = $('a .image img', this).data('lazy-src');
	var ratingNo = $(".grade-badge", this).html();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
		objCOS.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink);
	});
				
			
		console.log(objCOS);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	''
	//write to json
jf.writeFile(file, objCOS, function(err) {
	console.log("this is not working", err)
})
	
});
