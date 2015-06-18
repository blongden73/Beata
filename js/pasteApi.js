var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.pastemagazine.com/articles/music/reviews/";

var jf = require('jsonfile');	
var file = 'js/PasteData.json';
var fs = require('fs');

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objPaste = {};
	objPaste["provider"] = [{provider : 'Paste'}] ;						
	objPaste["artists"] = [];
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
$("form .tags-detail-wrapper #tags-detail-wrapper #landing-left-column ul.tagged-articles-list > li").each(function(index){
	var artistName = $("a.title", this).html().replace('&amp;', '&').replace('&apos;',"'" ).replace('&#x2019;', "'");
	var artistNameSplit = artistName.split(':');
	var artist = artistNameSplit[0];
	var albumName = artistNameSplit[1].replace('<i>','').replace('</i>', '');
	var imageLink = $("a.image img", this).attr('src').replace('\r\n        ', '').replace('\\','');
	var ratingNo = $("a.rating i.number", this).html();
	var sClink = $(".text-wrap .node-title a", this).attr('href');
	var id = artist.replace(/\s+/g, '').toLowerCase();
	var imagePath = 'imgs/paste/' + id + ".jpeg";
		objPaste.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, sClink, id, imagePath);
	});
				
	for(var i = 0; i < objPaste.artists.length; i++){

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(objPaste.artists[i].image, 'imgs/paste/'+objPaste.artists[i].idvalue+'.jpeg', function(){
  console.log('done');
  
});					
};
		
		console.log(objPaste);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objPaste, function(err) {
	console.log("this is not working", err)
})
	
});
