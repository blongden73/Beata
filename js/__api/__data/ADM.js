var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.anydecentmusic.com/source/All+Music.aspx";

var jf = require('jsonfile');
var file = 'js/__api/__json/ADM.json';
var fs = require('fs');
var ce = require('colour-extractor');

request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objAllMusic = {};
        objAllMusic["provider"] = [{
            provider: 'Any Decent Music',
            providerlink: 'http://www.anydecentmusic.com/source/All+Music.aspx',
            backgroundImage: '../assets/white__denim.png'
        }];
        objAllMusic["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, albumName, image, fullimage, rating, stars, soundcloud, idvalue, imagePath, conversionPath, date) {
            this.artist = artist
            this.albumName = albumName
            this.image = image
            this.fullimage = fullimage
            this.rating = rating
            this.stars = stars
            this.soundcloud = soundcloud
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.conversionPath = conversionPath
            this.date = date
        }

        //loop through albums list and get individual parts
        $(".article ol.album_chart li").each(function(index) {
            var artistName = $(".album_detail h4 a", this).text().replace('And', '&');
            var albumName = $(".album_detail h5 a", this).text()//.replace('&apos;', "'");
            var imageLink = $(".album_detail a img", this).attr('src');
            var fullImage = 'http://www.anydecentmusic.com/' + imageLink;
            var imageflag;
            //If image doesn't exist can it
            if (imageLink == undefined) {
                imageflag = false
            }
            var rating = $(".album_detail .score_wrap p.score", this).text();
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
            var coversionPath = 'imgs/any__decent__music/ ' + id + ".png";
            var date = new Date().toJSON().slice(0,10);

			if(imageflag !== false){
			//finds colours from images and then writes the JSON // This is ASYNC so does this last
            ce.topColours(imagePath, true, function (colours) {
				console.log(colours[0][1]);
				var colourObj = colours[0][1]
				var colour = JSON.stringify(colourObj);
				var cleanColour = colour.replace("[", "").replace("]", "")
				var r = colours[0][1][0];
				var g = colours[0][1][1];
				var b =colours[0][1][2];
				var calc = r+r+b+g+g+g;
				var brightness = calc/6;
				var colorClass = 'white';
				objAllMusic.artists[index].colour = cleanColour;
				objAllMusic.artists[index].bright = brightness;
				objAllMusic.artists[index].colorClass = colorClass;
				if(brightness >= 159){
					objAllMusic.artists[index].brightnessColor = '3,3,3';
					objAllMusic.artists[index].colorClass = 'black';
				}else{
					objAllMusic.artists[index].brightnessColor = '255,255,255';
					objAllMusic.artists[index].colorClass = 'white';
				}
				console.log(objAllMusic);
				 jf.writeFile(file, objAllMusic, function(err) {
					 console.log("this is not working", err)
    			})
			});
			}
			if(imageflag !== false){
            objAllMusic.artists[index] = new albumInfo(artistName, albumName, imageLink, fullImage, rating, StarRating, sClink, id, imagePath, coversionPath, date);
            }
		
        });


        console.log(objAllMusic);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

});