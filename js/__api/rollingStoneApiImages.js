var request = require("request"),
	cheerio = require("cheerio"),
	rollingurl = "http://www.rollingstone.com/music/new-albums";

var fs = require('fs');

	
request(rollingurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objRolling = {};
	objRolling["provider"] = [{provider : 'Rolling Stone'}] ;						
	objRolling["artists"] = [];
	//create new object titles for albums 
		function albumInfo(artist, image, idvalue, imagePath){
    		this.artist = artist
			this.image = image
			this.idvalue = idvalue
			this.imagePath = imagePath
}

	//loop through albums list and get individual parts
	$(".primary ul.primary-list > li").each(function(index){
		var artistName = $("a .content .list-item-hd", this).html().replace('&apos;', '').replace('&apos;', '');
		var artistNameSplit = artistName.split(',');
		var artist = artistNameSplit[0];
		var imageLink = $(".primary-img-container .js-img-lazy", this).data('src');
		var id = artist.replace(/\s+/g, '').toLowerCase().replace('?', '').replace('/\,/g', '');
		var imagePath = 'imgs/rolling__stone/' + id + ".jpeg";
		objRolling.artists[index] = new albumInfo(artist, imageLink, id, imagePath);
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
});


