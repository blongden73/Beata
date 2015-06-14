var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.allmusic.com/newreleases";

var jf = require('jsonfile');	
var file = 'js/AllMusicData.json';

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objAllMusic = {};
	objAllMusic["provider"] = [{provider : 'All Music'}] ;						
	objAllMusic["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
}

//loop through albums list and get individual parts
$(".featured-rows .row .featured").each(function(index){
	var artistName = $(".artist a" , this).html();
	if (artistName == null) {artistName = 'Various Artists'}; 
	if (artistName == "Anima Music&#xE6; Chamber Orchestra") {artistName = "Anima Musicæ Chamber Orchestra"};
	var albumName = $(".title a" , this).html().replace('&#xE4;', 'ä');
	var imageLink = $(".album-cover a img.lazy", this).data('original');
	var ratingNo = $(".rating.allmusic span", this).attr('class').replace('allmusic-rating', '');
	var ratingsplit =ratingNo.split('-');
	var rating = ratingsplit[2];
	var sClink = $(".text-wrap .node-title a", this).attr('href');
		objAllMusic.artists[index] = new albumInfo(artistName, albumName, imageLink, rating, sClink);
	});
				
			
		console.log(objAllMusic);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objAllMusic, function(err) {
	console.log("this is not working", err)
})
	
	
});
