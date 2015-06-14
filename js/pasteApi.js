var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.pastemagazine.com/articles/music/reviews/";

var jf = require('jsonfile');	
var file = 'js/PasteData.json';

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objPaste = {};
	objPaste["provider"] = [{provider : 'Paste'}] ;						
	objPaste["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
}

//loop through albums list and get individual parts
$("form .tags-detail-wrapper #tags-detail-wrapper #landing-left-column ul.tagged-articles-list > li").each(function(index){
	var artistName = $("a.title", this).html().replace('&amp;', '&').replace('&apos;',"'" ).replace('&#x2019;', "'");
	var artistNameSplit = artistName.split(':');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1].replace('<i>','').replace('</i>', '');
	var imageLink = $("a.image img", this).attr('src').replace('\r\n        ', '').replace('\\','');
	var ratingNo = $("a.rating i.number", this).html();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
		objPaste.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink);
	});
				
			
		console.log(objPaste);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objPaste, function(err) {
	console.log("this is not working", err)
})
	
});
