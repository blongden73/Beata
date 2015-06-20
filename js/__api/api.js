var request = require("request"),
	cheerio = require("cheerio"),
	url = "http://pitchfork.com/reviews/best/albums/";

var jf = require('jsonfile');	
var file = 'js/__json/data.json';
var fs = require('fs');
var ColorThief = require('color-thief');
	
request(url, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				obj = {};
	obj["provider"] = [
		{provider : 'Pitchfork',
		url : 'http://www.pitchfork.com'	
		}] ;						
	obj["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, albumName, image, rating, soundcloud, idvalue, imagePath, colour){
    		this.artist = artist
			this.albumName = albumName
			this.image = image
			this.rating = rating
			this.soundcloud = soundcloud
			this.idvalue = idvalue
			this.imagePath = imagePath
			this.colour = colour
		}

	//loop through albums list and get individual parts
	$("ul.object-list.bnm-list > li").each(function(index){
		var artistName = $(".info h1", this).html().replace("&apos;", "'").replace('&amp;', '&');
		var albumName = $(".info h2", this).html();
		var imageLink = $("a .artwork .lazy", this).data('content').replace(" <img src=\"", "").replace("\" /> ", "");
		var ratingNo = $(".info .score", this).html();
		var sClink = $(".info .reveiw-audio ul li .p4k-player-track", this).data('href');
		var id = artistName.replace(/\s+/g, '').toLowerCase();
		var imagePath = 'imgs/pitchfork/' + id + ".jpeg";
		var colorThief = new ColorThief();
		var colourObj = colorThief.getColor(imagePath);
		var colour = colourObj.toString();
			obj.artists[index] = new albumInfo(artistName, albumName, imageLink, ratingNo, sClink, id, imagePath, colour);
		});
				
	// Loop through object 			
	for(var i = 0; i < obj.artists.length; i++){
	//set up fucntion for download	
	var download = function(uri, filename, callback){
	// set request params			
	  request.head(uri, function(err, res, body){
	  console.log('content-type:', res.headers['content-type']);
	  console.log('content-length:', res.headers['content-length']);
	//request file and stream 
	    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	  });
	};
	//download file set image path and define filename
		download(obj.artists[i].image, 'imgs/pitchfork/'+obj.artists[i].idvalue+'.jpeg', function(){
		  console.log('done');
		});					
	};
				
	//log object 		
		console.log(obj);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
	jf.writeFile(file, obj, function(err) {
		console.log("this is not working", err)
	})	
});
