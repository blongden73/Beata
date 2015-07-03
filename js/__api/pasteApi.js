var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.pastemagazine.com/articles/music/reviews/";

var jf = require('jsonfile');
var file = 'js/__api/__json/PasteData.json';
var fs = require('fs');
var ColorThief = require('color-thief');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objPaste = {};
        objPaste["provider"] = [{
            provider: 'Paste'
        }];
        objPaste["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, albumName, image, rating, ratingRound, stars, soundcloud, idvalue, imagePath, colour) {
            this.artist = artist
            this.albumName = albumName
            this.image = image
            this.rating = rating
            this.ratingRound = ratingRound
            this.stars = stars
            this.soundcloud = soundcloud
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.colour = colour

        }

        //loop through albums list and get individual parts
        $("form .tags-detail-wrapper #tags-detail-wrapper #landing-left-column ul.tagged-articles-list > li").each(function(index) {
            var artistName = $("a.title", this).html().replace('&amp;', '&').replace('&apos;', "'").replace('&#x2019;', "'");
            var artistNameSplit = artistName.split(':');
            var artist = artistNameSplit[0];
            var albumName = artistNameSplit[1];
            var imageLink = $("a.image img", this).attr('src').replace('\r\n        ', '').replace('\\', '');
            var ratingNo = $("a.rating i.number", this).html();
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
            }  if (ratingNo == null) {
                ratingNo = "0"
            }
            var sClink = $(".text-wrap .node-title a", this).attr('href');
            var id = artist.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/paste/' + id + ".jpeg";
            //get colours
            var colorThief = new ColorThief();
            var colourObj = colorThief.getColor(imagePath);
            var colour = colourObj.toString();
            objPaste.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, ratingRound, StarRating, sClink, id, imagePath, colour);
        });

       objUncut = {};
	objUncut["provider"] = [{provider : 'Paste', url : 'http://www.pastemagazine.com'}];
	objUncut["artists"] = [];
			
	for(var i = 0; i < objPaste.artists.length; i++){
		if(objPaste.artists[i].ratingRound == "8"){	
		objUncut.artists.push(objPaste.artists[i]);
		}
		else if(objPaste.artists[i].ratingRound == "9"){	
		objUncut.artists.push(objPaste.artists[i]);
		}
		else if(objPaste.artists[i].ratingRound == "10"){	
		objUncut.artists.push(objPaste.artists[i]);
		}
		
	}		

        console.log(objUncut);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    jf.writeFile(file, objUncut, function(err) {
        console.log("this is not working", err)
    })
});