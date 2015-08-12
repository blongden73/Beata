var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.allmusic.com/newreleases";

var jf = require('jsonfile');
var file = 'js/__api/__json/AllMusicData.json';
var fs = require('fs');
var ColorThief = require('color-thief');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objAllMusic = {};
        objAllMusic["provider"] = [{
            provider: 'All Music'
        }];
        objAllMusic["artists"] = [];
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
        $(".featured-rows .row .featured").each(function(index) {
            var artistName = $(".artist a", this).html().replace('&#xF6;', 'ö');
            if (artistName == null) {
                artistName = 'Various Artists'
            };
            if (artistName == "Anima Music&#xE6; Chamber Orchestra") {
                artistName = "Anima Musicæ Chamber Orchestra"
            };
            var albumName = $(".title a", this).html().replace('&#xE4;', 'ä').replace('&#xF6;', 'ö');
            var imageLink = $(".album-cover a img.lazy", this).data('original');
            var ratingNo = $(".rating.allmusic span", this).attr('class').replace('allmusic-rating', '');
            var ratingsplit = ratingNo.split('-');
            var rating = ratingsplit[2];
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
            var imagePath = 'imgs/all__music/' + id + ".jpeg";
            //get colours
            var colorThief = new ColorThief();
            var colourObj = colorThief.getColor(imagePath);
            var colour = colourObj.toString();
            objAllMusic.artists[index] = new albumInfo(artistName, albumName, imageLink, rating, StarRating, sClink, id, imagePath, colour);
        });

       objUncut = {};
	objUncut["provider"] = [{provider : 'All Music', url : 'http://www.allmusic.com'}];
	objUncut["artists"] = [];
			
	for(var i = 0; i < objAllMusic.artists.length; i++){
		if(objAllMusic.artists[i].rating == "8"){	
		objUncut.artists.push(objAllMusic.artists[i]);
		}
		else if(objAllMusic.artists[i].rating == "9"){	
		objUncut.artists.push(objAllMusic.artists[i]);
		}
		else if(objAllMusic.artists[i].rating == "10"){	
		objUncut.artists.push(objAllMusic.artists[i]);
		}
		
	}		
        console.log(objAllMusic);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    jf.writeFile(file, objUncut, function(err) {
        console.log("this is not working", err)
    })
});