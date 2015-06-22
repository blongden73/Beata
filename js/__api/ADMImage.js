var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.anydecentmusic.com/source/All+Music.aspx";

var fs = require('fs');


	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objAllMusic = {};
				objAllMusic["provider"] = [{provider : 'Any Decent Music', url : 'http://www.anydecentmusic.com'}] ;						
				objAllMusic["artists"] = [];
				//create new object titles for albums 
				function albumInfo(artist, image, fullimage, idvalue, imagePath){
					this.artist = artist
					this.image = image
					this.fullimage = fullimage
					this.idvalue = idvalue
					this.imagePath = imagePath
				}

		//loop through albums list and get individual parts
		$(".article ol.album_chart li").each(function(index){
		var artistName = $(".album_detail h4 a" , this).html();
		var imageLink = $(".album_detail a img", this).attr('src');
		var fullImage = 'http://www.anydecentmusic.com/'+imageLink;
		var imageflag ;
		//If image doesn't exist can it
		if (imageLink == undefined){
			imageflag = false
			}
		var id = artistName.replace(/\s+/g, '').toLowerCase();
		var imagePath = 'imgs/any__decent__music/' + id + ".jpeg";
		if (imageflag != false){
			objAllMusic.artists[index] = new albumInfo(artistName, imageLink, fullImage, id, imagePath);
		}
		});
		
		//Loop through object to download images 		
		for(var i = 0; i < objAllMusic.artists.length; i++){
			//Set up function for the download
			var download = function(uri, filename, callback){
				request.head(uri, function(err, res, body){
					console.log('content-type:', res.headers['content-type']);
					console.log('content-length:', res.headers['content-length']);
					request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  				});
			};
		//Download file from url in object and set file name to ID
		download(objAllMusic.artists[i].fullimage, 'imgs/any__decent__music/'+objAllMusic.artists[i].idvalue+'.jpeg', function(){
			console.log('done');
			});					
		};
	
			
		console.log(objAllMusic);
		} else {
			console.log("We’ve encountered an error: " + error);
		}
	
});
