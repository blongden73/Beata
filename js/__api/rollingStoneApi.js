var request = require("request"),
	cheerio = require("cheerio"),
	rollingurl = "http://www.rollingstone.com/music/new-albums";

var jf = require('jsonfile');	
var file = 'js/__json/rollingData.json';
var fs = require('fs');

	
request(rollingurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objRolling = {};
	objRolling["provider"] = [{provider : 'Rolling Stone'}] ;						
	objRolling["artists"] = [];
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
$(".primary ul.primary-list > li").each(function(index){
	var artistName = $("a .content .list-item-hd", this).html().replace('&apos;', '').replace('&apos;', '');
	var artistNameSplit = artistName.split(',');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1];
	var imageLink = $(".primary-img-container .js-img-lazy", this).data('src');
	var rating = $(".rating-stars span.full", this).length;
	var ratingNo = rating.toString();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
	var id = artist.replace(/\s+/g, '').toLowerCase().replace('?', '').replace('/\,/g', '');
	var imagePath = 'imgs/rolling__stone/' + id + ".jpeg";
		objRolling.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink, id, imagePath);
	});
				
	for(var i = 0; i < objRolling.artists.length; i++){

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(objRolling.artists[i].image, 'imgs/rolling__stone/'+objRolling.artists[i].idvalue+'.jpeg', function(){
  console.log('done');
  
});					
};
		
		console.log(objRolling);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objRolling, function(err) {
	console.log("this is not working", err)
})
	
	
});


