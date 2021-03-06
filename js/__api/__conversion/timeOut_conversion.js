var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.timeout.com/london/music/album-reviews";

var fs = require('fs');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objTimeOut = {};
        objTimeOut["provider"] = [{
            provider: 'Time Out'
        }];
        objTimeOut["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, image, idvalue, imagePath, coversionPath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.coversionPath = coversionPath
        }

        //loop through albums list and get individual parts
        $(".four_column_grid .tiles .tile.category_5").each(function(index) {
            var artistName = $(".tile__content .tile__body .tile__text h3.tile__title", this).html().replace('\n\t\t\t\t\t\t', '').replace('&#x2013;', '-').replace('&#x2018;', '').replace('&#x2019;', '').replace('\n\t\t\t\t\t', '').replace('&amp;','&').replace('+', 'And').replace('/^\s\s*/', '');
            var artistNameSplit = artistName.split('-');
            var artist = artistNameSplit[0].trim();
            var imageLink = $(".tile__content .image_wrapper img", this).attr('src');
            var id = artist.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/time__out/' + id + ".jpeg";
            var coversionPath = 'imgs/time__out/ ' + id + ".png";
            convert(imagePath,        
					conversionPath, 
					{ width: 300, height: 300 },
					function(err) {
					if (!err) {
					console.log("Hooray, your image is ready!");
    				}
  				}
  			);

            objTimeOut.artists[index] = new albumInfo(artist, imageLink, id, imagePath, coversionPath);
        });

        console.log(objTimeOut);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});