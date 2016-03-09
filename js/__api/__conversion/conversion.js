var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://pitchfork.com/reviews/best/albums/";

var fs = require('fs');
var convert = require('netpbm').convert;


request(url, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            obj = {};
        obj["provider"] = [{
            provider: 'Pitchfork',
            url: 'http://www.pitchfork.com',
            colour: '#ef4135'
        }];
        obj["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, image, idvalue, imagePath, conversionPath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.conversionPath = conversionPath
        }

        //loop through albums list and get individual parts
        $("ul.object-list.bnm-list > li").each(function(index) {
            var artistName = $(".info h1", this).html().replace("&apos;", "'").replace('&amp;', '&').replace("&#x2019;", "'");
            var imageLink = $("a .artwork .lazy", this).data('content').replace(" <img src=\"", "").replace("\" /> ", "").replace('\n', '').replace('" />\n','').trim();
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/pitchfork/' + id + ".jpeg";
            var conversionPath = 'imgs/pitchfork/ ' + id + ".png";
            convert(imagePath,        
					conversionPath, 
					{ width: 300, height: 300 },
					function(err) {
					if (!err) {
					console.log("Hooray, your image is ready!");
    				}
  				}
  			);
            obj.artists[index] = new albumInfo(artistName, imageLink, id, imagePath, conversionPath);
        });

        //log object 		
        console.log(obj);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});