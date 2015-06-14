var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.timeout.com/london/music/album-reviews";

var jf = require('jsonfile');	
var file = 'js/TimeOutData.json';

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objTimeOut = {};
	objTimeOut["provider"] = [{provider : 'Time Out'}] ;						
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
$(".four_column_grid .tiles .tile").each(function(index){
	var artistName = $(".tile__content .tile__body .tile__text h3.tile__title", this).html().replace('\n\t\t\t\t\t\t', '').replace('&#x2013;', '-').replace('&#x2018;', '').replace('&#x2019;', '').replace('\n\t\t\t\t\t', '');
	var artistNameSplit = artistName.split('-');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1];
	var imageLink = $(".tile__content .image_wrapper img", this).attr('src');
	var rating = $(".tile__content .tile__bottom_rail .timeout_rating .icon_highlight", this).length;
	var ratingNo = rating.toString();
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
