var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.allmusic.com/newreleases";

var jf = require('jsonfile');
var file = 'js/__api/__json/AllMusicData.json';
var fs = require('fs');
var ce = require('colour-extractor');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objAllMusic = {};
        objAllMusic["provider"] = [{
            provider: 'All Music',
            providerlink: 'http://www.allmusic.com/newreleases',
            backgroundImage: '../assets/white__denim.png'
        }];
        objAllMusic["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, albumName, image, rating, stars, soundcloud, idvalue, imagePath, conversionPath, date) {
            this.artist = artist
            this.albumName = albumName
            this.image = image
            this.rating = rating
            this.stars = stars
            this.soundcloud = soundcloud
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.conversionPath = conversionPath
            this.date = date
        }

        //loop through albums list and get individual parts
        $(".featured-rows .row .featured").each(function(index) {
            var artistCheck = $(".artist a", this).text();  
		   	if(artistCheck !== null){
				var artistName = $(".artist a", this).text().replace(',',' ').replace('(',' ').replace(')', ' ');//.replace('&#xF6;', 'ö');   	
		   	}  
		   	if (artistName == "") {
                artistName = 'Various Artists'
            };
            if (artistName == null) {
                artistName = 'Various Artists'
            };
            if (artistName == "Anima Music&#xE6; Chamber Orchestra") {
                artistName = "Anima Musicæ Chamber Orchestra"
            };
            var albumName = $(".title a", this).text()//.replace('&#xE4;', 'ä').replace('&#xF6;', 'ö');
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
            var imageName = "allmusic" + index;
            var imagePath = 'imgs/all__music/' + imageName + ".jpeg";
            var coversionPath = 'imgs/all__music/ ' + id + ".png";
            var date = new Date().toJSON().slice(0,10);
            //get colours
            
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
				objAllMusic.artists[index].colorClass = colorClass;
				objAllMusic.artists[index].colour = cleanColour;
				objAllMusic.artists[index].bright = brightness;
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
			
				objAllMusic.artists[index] = new albumInfo(artistName, albumName, imageLink, rating, StarRating, sClink, id, imagePath, coversionPath, date);
			
        });

    /*   objUncut = {};
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
		
	}*/		
        console.log(objAllMusic);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    
});