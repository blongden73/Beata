var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://consequenceofsound.net/category/reviews/album-reviews/cos-top-rated/";

var jf = require('jsonfile');
var file = 'js/__json/COSData.json';
var fs = require('fs');
var ColorThief = require('color-thief');


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
        function albumInfo(artist, albumName, image, rating, stars, soundcloud, idvalue, imagePath, colour) {
            this.artist = artist
            this.albumName = albumName
            this.image = image
            this.rating = rating
            this.stars = stars
            this.soundcloud = soundcloud
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.colour = colour
        }

        //loop through albums list and get individual parts
        $(".modules-grid #tab-everything .post").each(function(index) {
            var artistName = $(".content > h1 > a", this).html().replace('Album Review:', '').replace('&#x2013;', '-').replace('&#xA0;', ' ').replace('&#xF6;', 'ö');
            var artistSplit = artistName.split('-');
            var artist = artistSplit[0];
            var albumName = artistSplit[1];
            var imageLink = $('a .image img', this).data('lazy-src');
            var ratingNo = $(".grade-badge", this).html();
            var StarRating;
            if (ratingNo == 'A-') {
                StarRating = 'fourHalf'
            } else if (ratingNo == 'A') {
                StarRating = 'four'
            } else if (ratingNo == 'A+') {
                StarRating = 'five'
            }
            var sClink = $(".text-wrap .node-title a", this).attr('href');
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/COS/' + id + ".jpeg";
            //get colours
            var colorThief = new ColorThief();
            var colourObj = colorThief.getColor(imagePath);
            var colour = colourObj.toString();
            objCOS.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, colour);
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

    //write to json
    jf.writeFile(file, objCOS, function(err) {
        console.log("this is not working", err)
    })
});