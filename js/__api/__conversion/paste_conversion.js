var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.pastemagazine.com/articles/music/reviews/";

var fs = require('fs');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objPaste = {};
        objPaste["provider"] = [{
            provider: 'Paste'
        }];
        objPaste["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, image, idvalue, imagePath, coversionPath) {
            /*this.test = test*/
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.coversionPath = coversionPath

        }

        //loop through albums list and get individual parts
        $("form .tags-detail-wrapper #tags-detail-wrapper #landing-left-column .tags-detail-container ul.tagged-articles-list li:not('.ad , .mobile-ad')").each(function(index) {
            /*var test = $('a.title', this).html();
            var imageLink = $("a.image", this).data('image-large'); 
            console.log(imageLink);*/
           var artistName = $("a.title", this).html().replace('&amp;', '&').replace('&apos;', "'").replace('&#x2019;', "'");
            var artistNameSplit = artistName.split(':');
            var artist = artistNameSplit[0];
            var imageLink = $("a.image", this).data('image-large'); 
            var id = artist.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/paste/' + id + ".jpeg";
            var coversionPath = 'imgs/paste/ ' + id + ".png";
            convert(imagePath,        
					conversionPath, 
					{ width: 300, height: 300 },
					function(err) {
					if (!err) {
					console.log("Hooray, your image is ready!");
    				}
  				}
  			);
            objPaste.artists[index] = new albumInfo(artist, imageLink, id, imagePath, coversionPath); 
        });

       
        console.log(objPaste);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});