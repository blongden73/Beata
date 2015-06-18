var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.allmusic.com/newreleases";

var jf = require('jsonfile');	
var file = 'js/AllMusicData.json';
var fs = require('fs');

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objAllMusic = {};
	objAllMusic["provider"] = [{provider : 'All Music'}] ;						
	objAllMusic["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud, idvalue, imagePath){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
			this.idvalue = idvalue
			this.imagePath = imagePath
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
	var id = artistName.replace(/\s+/g, '').toLowerCase();
	var imagePath = 'imgs/all__music/' + id + ".jpeg";
		objAllMusic.artists[index] = new albumInfo(artistName, albumName, imageLink, rating, sClink, id, imagePath);
	});
				
	for(var i = 0; i < objAllMusic.artists.length; i++){

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(objAllMusic.artists[i].image, 'imgs/all__music/'+objAllMusic.artists[i].idvalue+'.jpeg', function(){
  console.log('done');
  
});					
};
	
			
		console.log(objAllMusic);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objAllMusic, function(err) {
	console.log("this is not working", err)
})
	
	
});
