var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.clashmusic.com/reviews/album";

var jf = require('jsonfile');	
var file = 'js/dataClash.json';

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objClash = {};
	objClash["provider"] = [{provider : 'Clash'}] ;						
	objClash["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
}

//loop through albums list and get individual parts
$("ul.article-preview-list > li").each(function(index){
	var artistName = $(".text-wrap .node-title a", this).html().replace('&apos;', '').replace('&apos;', '').replace('&#xF6;', 'ö').replace('&amp;', '&');
	var artistNameSplit = artistName.split('-');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1];
	var imageLink = $(".article-teaser .teaser-image a img[typeof='foaf:Image']", this).attr('src');
	var ratingNo = $(".info .score", this).html();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
		objClash.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink);
	});
				
			
		console.log(objClash);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objClash, function(err) {
	console.log("this is not working", err)
})
	
	
});
