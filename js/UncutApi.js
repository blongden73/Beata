var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.uncut.co.uk/reviews-home";

var jf = require('jsonfile');	
var file = 'js/UncutData.json';
var fs = require('fs');

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objTimeOut = {};
	objTimeOut["provider"] = [{provider : 'Uncut'}] ;						
	objTimeOut["artists"] = [];
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
$("#keystone-query-widget-id-2 .sections .section-style-grid-large .type-review").each(function(index){
	var artistName = $(".entry-header h2 a", this).html().replace('&#x2013;', '-').replace('&amp;', '&').replace('&#xE9;', 'é');
	var artistNameSplit = artistName.split('-');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1];
	var imageLink = $(".entry-media a img", this).attr('src');
	var ratingNo = $(".out-of-ten .out-of-ten-rating", this).html();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
	var id = artistName.replace('-', '').replace('-', '').replace('/', '').replace(/\s+/g, '').toLowerCase().replace('&#x2019;', '').replace(':', '');
	var imagePath = 'imgs/uncut/' + id + ".jpeg";
		objTimeOut.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink, id, imagePath);
	});
		
	for(var i = 0; i < objTimeOut.artists.length; i++){

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(objTimeOut.artists[i].image, 'imgs/uncut/'+objTimeOut.artists[i].idvalue+'.jpeg', function(){
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
