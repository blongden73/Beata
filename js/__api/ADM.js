var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.anydecentmusic.com/source/All+Music.aspx";

var jf = require('jsonfile');
var file = 'js/__json/ADM.json';
var fs = require('fs');
var ColorThief = require('color-thief');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objAllMusic = {};
        objAllMusic["provider"] = [{
            provider: 'Any Decent Music',
            url: 'http://www.anydecentmusic.com'
        }];
        objAllMusic["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, albumName, image, fullimage, rating, stars, soundcloud, idvalue, imagePath, colour) {
            this.artist = artist
            this.albumName = albumName
            this.image = image
            this.fullimage = fullimage
            this.rating = rating
            this.stars = stars
            this.soundcloud = soundcloud
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.colour = colour
        }

        //loop through albums list and get individual parts
        $(".article ol.album_chart li").each(function(index) {
            var artistName = $(".album_detail h4 a", this).html();
            var albumName = $(".album_detail h5 a", this).html().replace('&apos;', "'");
            var imageLink = $(".album_detail a img", this).attr('src');
            var fullImage = 'http://www.anydecentmusic.com/' + imageLink;
            var imageflag;
            //If image doesn't exist can it
            if (imageLink == undefined) {
                imageflag = false
            }
            var rating = $(".album_detail .score_wrap p.score", this).html();
            var ratingRound = Math.round(rating);
            var StarRating;
            if (ratingRound == 1) {
                StarRating = 'half'
            } else if (ratingRound == 2) {
                StarRating = 'one'
            } else if (ratingRound == 3) {
                StarRating = 'oneHalf'
            } else if (ratingRound == 4) {
                StarRating = 'two'
            } else if (ratingRound == 5) {
                StarRating = 'twoHalf'
            } else if (ratingRound == 6) {
                StarRating = 'three'
            } else if (ratingRound == 7) {
                StarRating = 'threeHalf'
            } else if (ratingRound == 8) {
                StarRating = 'four'
            } else if (ratingRound == 9) {
                StarRating = 'fourHalf'
            } else if (ratingRound == 10) {
                StarRating = 'five'
            }

            var sClink = $(".text-wrap .node-title a", this).attr('href');
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/any__decent__music/' + id + ".jpeg";
            // Only write to object if image exists otherwise can the info
            if (imageflag != false) {
                //get colours
                var colorThief = new ColorThief();
                var colourObj = colorThief.getColor(imagePath);
                var colour = colourObj.toString();
                objAllMusic.artists[index] = new albumInfo(artistName, albumName, imageLink, fullImage, rating, StarRating, sClink, id, imagePath, colour);
            }
        });


        console.log(objAllMusic);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    jf.writeFile(file, objAllMusic, function(err) {
        console.log("this is not working", err)
    })
});