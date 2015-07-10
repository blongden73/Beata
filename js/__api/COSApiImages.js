var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://consequenceofsound.net/category/reviews/album-reviews/cos-top-rated/";


var fs = require('fs');


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
        function albumInfo(artist, image, idvalue, imagePath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
        }

        //loop through albums list and get individual parts
        $(".modules-grid #tab-everything .post").each(function(index) {
            var artistName = $(".content > h1 > a", this).html().replace('Album Review:', '').replace('&#x2013;', '-').replace('&#xA0;', ' ').replace('&#xF6;', 'ö');
            var artistSplit = artistName.split('-');
            var artist = artistSplit[0].trim();
            var imageLink = $('a .image img', this).data('lazy-src');
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/COS/' + id + ".jpeg";
            objCOS.artists[index] = new albumInfo(artist, imageLink, id, imagePath);
        });

        for (var i = 0; i < objCOS.artists.length; i++) {

            var download = function(uri, filename, callback) {
                request.head(uri, function(err, res, body) {
                    console.log('content-type:', res.headers['content-type']);
                    console.log('content-length:', res.headers['content-length']);

                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };

            download(objCOS.artists[i].image, 'imgs/COS/' + objCOS.artists[i].idvalue + '.jpeg', function() {
                console.log('done');
            });
        };


        console.log(objCOS);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});