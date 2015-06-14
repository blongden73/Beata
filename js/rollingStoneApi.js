var request = require("request"),
	cheerio = require("cheerio"),
	rollingurl = "http://www.rollingstone.com/music/new-albums";

var jf = require('jsonfile');	
var file = 'js/rollingData.json';

	
request(rollingurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objRolling = {};
	objRolling["provider"] = [{provider : 'Rolling Stone'}] ;						
	objRolling["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
}

//loop through albums list and get individual parts
$(".primary ul.primary-list > li").each(function(index){
	var artistName = $("a .content .list-item-hd", this).html().replace('&apos;', '').replace('&apos;', '');
	var artistNameSplit = artistName.split(',');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1];
	var imageLink = $(".primary-img-container .js-img-lazy", this).data('src');
	var rating = $(".rating-stars span.full", this).length;
	var ratingNo = rating.toString();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
		objRolling.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink);
	});
				
			
		console.log(objRolling);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objRolling, function(err) {
	console.log("this is not working", err)
})
	
	
});


