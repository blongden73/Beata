var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.allmusic.com/newreleases";

var fs = require('fs');
var convert = require('netpbm').convert;

request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objAllMusic = {};
        objAllMusic["provider"] = [{
            provider: 'All Music'
        }];
        objAllMusic["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, image, idvalue, imagePath, conversionPath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.conversionPath = conversionPath
        }

        //loop through albums list and get individual parts
        $(".featured-rows .row .featured").each(function(index) {
		   	var artistCheck = $(".artist a", this).html();  
		   	if(artistCheck !== null){
				var artistName = $(".artist a", this).html().replace('&#xF6;', 'ö');   	
		   	}  
            
            if (artistName == null) {
                artistName = 'Various Artists'
            };
            if (artistName == "Anima Music&#xE6; Chamber Orchestra") {
                artistName = "Anima Musicæ Chamber Orchestra"
            };
            var imageCheck = $(".album-cover a img.lazy", this).data('original');
            var imageLink = $(".album-cover a img.lazy", this).data('original');
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/all__music/' + id + ".jpeg";
            var coversionPath = 'imgs/all__music/ ' + id + ".png";
            convert(imagePath,        
					conversionPath, 
					{ width: 300, height: 300 },
					function(err) {
					if (!err) {
					console.log("Hooray, your image is ready!");
    				}
  				}
  			);
            objAllMusic.artists[index] = new albumInfo(artistName, imageLink, id, imagePath, conversionPath);
        });

       
        console.log(objAllMusic);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

});