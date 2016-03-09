var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.uncut.co.uk/reviews-home";

var jf = require('jsonfile');
var file = 'js/__json/UncutData.json';
var fs = require('fs');
var ColorThief = require('color-thief');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objTimeOut = {};
        objTimeOut["provider"] = [{
            provider: 'Uncut'
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
        $("#keystone-query-widget-id-2 .sections .section-style-grid-large .type-review").each(function(index) {
            var artistName = $(".entry-header h2 a", this).html().replace('&#x2013;', '-').replace('&#x2013;', '-').replace('&amp;', '&').replace('&#xE9;', 'é').replace('&#x2028;','').replace('/', '');
            var artistNameSplit = artistName.split('-');
            var artist = artistNameSplit[0].trim();
            var imageLink = $(".entry-media a img", this).attr('src');
            var id = artist.toLowerCase().replace(/\W+/g, "").replace('/', '');
            var imagePath = 'imgs/uncut/' + id + ".jpeg";
            var coversionPath = 'imgs/uncut/ ' + id + ".png";
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