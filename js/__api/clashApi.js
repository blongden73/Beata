var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.clashmusic.com/reviews/album";

var jf = require('jsonfile');	
var file = 'js/__json/dataClash.json';
var fs = require('fs');

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objClash = {};
	objClash["provider"] = [{provider : 'Clash'}] ;						
	objClash["artists"] = [];
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
$("ul.article-preview-list > li").each(function(index){
	var artistName = $(".text-wrap .node-title a", this).html().replace('&apos;', '').replace('&apos;', '').replace('&#xF6;', 'ö').replace('&amp;', '&');
	var artistNameSplit = artistName.split('-');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1];
	var imageLink = $(".article-teaser .teaser-image a img[typeof='foaf:Image']", this).attr('src');
	var ratingNo = $(".info .score", this).html();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
	var id = artistName.replace(/\s+/g, '').toLowerCase().replace('?', '').replace('-', '');
	var imagePath = 'imgs/clash/' + id + ".jpeg";
	
		objClash.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink, id, imagePath);
	});
	
	
	for(var i = 0; i < objClash.artists.length; i++){

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(objClash.artists[i].image, 'imgs/clash/'+objClash.artists[i].idvalue+'.jpeg', function(){
  console.log('done');
  
});					
};
		
			
		console.log(objClash);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
		
	
	//write to json
jf.writeFile(file, objClash, function(err) {
	console.log("this is not working", err)
})
	
});
