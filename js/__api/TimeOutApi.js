var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.timeout.com/london/music/album-reviews";

var jf = require('jsonfile');	
var file = 'js/__json/TimeOutData.json';
var fs = require('fs');
var ColorThief = require('color-thief');

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objTimeOut = {};
	objTimeOut["provider"] = [{provider : 'Time Out'}] ;						
	objTimeOut["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, stars, soundcloud, idvalue, imagePath, colour){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.stars = stars
			this.soundcloud = soundcloud
			this.idvalue = idvalue
			this.imagePath = imagePath
			this.colour = colour
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
	var ratingRound = Math.round(ratingNo);
	var StarRating;
	if (ratingRound == 1){
		StarRating = 'half'
	}
	else if(ratingRound == 2){
		StarRating = 'one'
	}
	
	else if (ratingRound == 3){
		StarRating = 'oneHalf'
	}
	else if (ratingRound == 4){
		StarRating = 'two'
	}
	else if (ratingRound == 5){
		StarRating = 'twoHalf'
	}
	else if (ratingRound == 6){
		StarRating = 'three'
	}
	else if (ratingRound == 7){
		StarRating = 'threeHalf'
	}
	else if (ratingRound == 8){
		StarRating = 'four'
	}
	else if (ratingRound == 9){
		StarRating = 'fourHalf'
	}
	else if (ratingRound == 10){
		StarRating = 'five'
	}
	var sClink = $(".text-wrap .node-title a", this).attr('href');
	var id = artist.replace(/\s+/g, '').toLowerCase();
	var imagePath = 'imgs/time__out/' + id + ".jpeg";
	//get colours
	var colorThief = new ColorThief();
	var colourObj = colorThief.getColor(imagePath);
	var colour = colourObj.toString();
	objTimeOut.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, colour);
	});
				
		for(var i = 0; i < objTimeOut.artists.length; i++){

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(objTimeOut.artists[i].image, 'imgs/time__out/'+objTimeOut.artists[i].idvalue+'.jpeg', function(){
  console.log('done');
  
});					
};
	
	
	
		
		console.log(objTimeOut);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objTimeOut, function(err) {
	console.log("this is not working", err)
})
	
});