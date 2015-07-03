var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.uncut.co.uk/reviews-home";

var jf = require('jsonfile');
var file = 'js/__api/__json/UncutData.json';
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
        $("#keystone-query-widget-id-2 .sections .section-style-grid-large .type-review").each(function(index) {
            var artistName = $(".entry-header h2 a", this).html().replace('&#x2013;', '-').replace('&#x2013;', '-').replace('&amp;', '&').replace('&#xE9;', 'é').replace('&#x2028;','');
            var artistNameSplit = artistName.split('-');
            var artist = artistNameSplit[0];
            var albumName = artistNameSplit[1];
            var imageLink = $(".entry-media a img", this).attr('src');
            var ratingNo = $(".out-of-ten .out-of-ten-rating", this).html();
            var ratingRound = Math.round(ratingNo);
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
            var id = artistName.replace('-', '').replace('-', '').replace('/', '').replace(/\s+/g, '').toLowerCase().replace('&#x2019;', '').replace(':', '');
            var imagePath = 'imgs/uncut/' + id + ".jpeg";
            //get colours
            var colorThief = new ColorThief();
            var colourObj = colorThief.getColor(imagePath);
            var colour = colourObj.toString();
            objTimeOut.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, colour);
        });

       objUncut = {};
	objUncut["provider"] = [{provider : 'Uncut', url : 'http://www.uncut.co.uk'}];
	objUncut["artists"] = [];
			
	for(var i = 0; i < objTimeOut.artists.length; i++){
		if(objTimeOut.artists[i].rating == "8"){	
		objUncut.artists.push(objTimeOut.artists[i]);
		}
		else if(objTimeOut.artists[i].rating == "9"){	
		objUncut.artists.push(objTimeOut.artists[i]);
		}
		else if(objTimeOut.artists[i].rating == "10"){	
		objUncut.artists.push(objTimeOut.artists[i]);
		}
		
	}		
       
       
       

        console.log(objTimeOut);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    jf.writeFile(file, objUncut, function(err) {
        console.log("this is not working", err)
    })

});