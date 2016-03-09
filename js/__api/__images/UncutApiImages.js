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
        function albumInfo(artist, image, idvalue, imagePath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
        }

        //loop through albums list and get individual parts
        $("#keystone-query-widget-id-2 .sections .section-style-grid-large .type-review").each(function(index) {
            var artistName = $(".entry-header h2 a", this).text();
            var artistNameSplit = artistName.split('-');
            var artist = artistNameSplit[0].trim();
            var imageLink = $(".entry-media a img", this).attr('src');
            var id = artist.toLowerCase().replace(/\W+/g, "").replace('/', '');
            var imagePath = 'imgs/uncut/' + id + ".jpeg";
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

            download(objTimeOut.artists[i].image, 'imgs/uncut/' + objTimeOut.artists[i].idvalue + '.jpeg', function() {
                console.log('done');
            });
        };


        console.log(objTimeOut);
    } else {
        console.log("We’ve encountered an error: " + error);
    }


});