var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://consequenceofsound.net/category/reviews/album-reviews/cos-top-rated/";


var fs = require('fs');
var convert = require('netpbm').convert;


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objCOS = {};
        objCOS["provider"] = [{
            provider: 'Consequences of Sound'
        }];
        objCOS["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, image, idvalue, imagePath, conversionPath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.conversionPath = conversionPath
            
        }

        //loop through albums list and get individual parts
        $(".modules-grid #tab-everything .post").each(function(index) {
            var artistName = $(".content > h1 > a", this).html().replace('Album Review:', '').replace('&#x2013;', '-').replace('&#xA0;', ' ').replace('&#xF6;', 'ö');
            var artistSplit = artistName.split('-');
            var artist = artistSplit[0].trim();
            var imageLink = $('a .image img', this).data('lazy-src');
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/COS/' + id + ".jpeg";
            var conversionPath = 'imgs/COS/ ' + id + ".png";  
            convert(imagePath,        
					conversionPath, 
					{ width: 300, height: 300 },
					function(err) {
					if (!err) {
					console.log("Hooray, your image is ready!");
    				}
  				}
  			);                      
            objCOS.artists[index] = new albumInfo(artist, imageLink, id, imagePath, conversionPath);
        });

        console.log(objCOS);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});