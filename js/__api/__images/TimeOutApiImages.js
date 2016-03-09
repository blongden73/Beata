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
        function albumInfo(artist, image, idvalue, imagePath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
        }

        //loop through albums list and get individual parts
        $(".four_column_grid .tiles .tile.category_5").each(function(index) {
            var artistName = $(".tile__content .tile__body .tile__text h3.tile__title", this).text();
            var artistNameSplit = artistName.split('–');
            var artist = artistNameSplit[0].trim();
            var imageLink = $(".tile__content .image_wrapper img", this).attr('src');
            var id = artist.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/time__out/' + id + ".jpeg";
            objTimeOut.artists[index] = new albumInfo(artist, imageLink, id, imagePath);
        });

        for (var i = 0; i < objTimeOut.artists.length; i++) {

            var download = function(uri, filename, callback) {
                request.head(uri, function(err, res, body) {
                    console.log('content-type:', res.headers['content-type']);
                    console.log('content-length:', res.headers['content-length']);
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };

            download(objTimeOut.artists[i].image, 'imgs/time__out/' + objTimeOut.artists[i].idvalue + '.jpeg', function() {
                console.log('done');
            });
        };

        console.log(objTimeOut);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});