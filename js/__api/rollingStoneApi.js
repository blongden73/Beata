var request = require("request"),
    cheerio = require("cheerio"),
    rollingurl = "http://www.rollingstone.com/music/new-albums";

var jf = require('jsonfile');
var file = 'js/__api/__json/rollingData.json';
var fs = require('fs');
var ColorThief = require('color-thief');


request(rollingurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objRolling = {};
        objRolling["provider"] = [{
            provider: 'Rolling Stone'
        }];
        objRolling["artists"] = [];
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
        $(".primary ul.primary-list > li").each(function(index) {
            var artistName = $("a .content .list-item-hd", this).html().replace('&apos;', '').replace('&apos;', '');
            var artistNameSplit = artistName.split(',');
            var artist = artistNameSplit[0];
            var albumName = artistNameSplit[1];
            var imageLink = $(".primary-img-container .js-img-lazy", this).data('src');
            var rating = $(".rating-stars span.full", this).length;
            var ratingNo = rating.toString();
            var ratingRound = Math.round(ratingNo);
            var StarRating;
            if (ratingRound == 1) {
                StarRating = 'one'
            } else if (ratingRound == 2) {
                StarRating = 'two'
            } else if (ratingRound == 3) {
                StarRating = 'three'
            } else if (ratingRound == 4) {
                StarRating = 'four'
            } else if (ratingRound == 5) {
                StarRating = 'five'
            }
            var sClink = $(".text-wrap .node-title a", this).attr('href');
            var id = artist.replace(/\s+/g, '').toLowerCase().replace('?', '').replace('/\,/g', '');
            var imagePath = 'imgs/rolling__stone/' + id + ".jpeg";
            //get colours
            var colorThief = new ColorThief();
            var colourObj = colorThief.getColor(imagePath);
            var colour = colourObj.toString();
            objRolling.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, colour);
        });

        objBestRolling = {};
        objBestRolling["provider"] = [{
            provider: 'Rolling Stone',
            url: 'http://www.rollingstone.com'
        }];
        objBestRolling["artists"] = [];

        for (var i = 0; i < objRolling.artists.length; i++) {
            if (objRolling.artists[i].rating == "4") {
                objBestRolling.artists.push(objRolling.artists[i]);
            } else if (objRolling.artists[i].rating == "5") {
                objBestRolling.artists.push(objRolling.artists[i]);
            }

        }

        console.log(objRolling);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    jf.writeFile(file, objBestRolling, function(err) {
        console.log("this is not working", err)
    })
});