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
		function albumInfo(artist, image, idvalue, imagePath, conversionPath){
    		this.artist = artist
			this.image = image
			this.idvalue = idvalue
			this.imagePath = imagePath
			this.conversionPath = conversionPath
}

	//loop through albums list and get individual parts
	$(".primary ul.primary-list > li").each(function(index){
		var artistName = $("a .content .list-item-hd", this).html().replace('&apos;', '').replace('&apos;', '');
		var artistNameSplit = artistName.split(',');
		var artist = artistNameSplit[0];
		var imageLink = $(".primary-img-container .js-img-lazy", this).data('src');
		var id = artist.replace(/\s+/g, '').toLowerCase().replace('?', '').replace('/\,/g', '');
		var imagePath = 'imgs/rolling__stone/' + id + ".jpeg";
		var conversionPath = 'imgs/rolling__stone/' + id + ".png";
		convert(imagePath,        
					conversionPath, 
					{ width: 300, height: 300 },
					function(err) {
					if (!err) {
					console.log("Hooray, your image is ready!");
    				}
  				}
  			);
		objRolling.artists[index] = new albumInfo(artist, imageLink, id, imagePath, conversionPath);
	});
		
		console.log(objRolling);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
});


