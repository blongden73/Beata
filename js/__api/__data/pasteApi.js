var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.pastemagazine.com/articles/music/reviews/";

var jf = require('jsonfile');
var file = 'js/__api/__json/PasteData.json';
var fs = require('fs');
var ce = require('colour-extractor');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objPaste = {};
        objPaste["provider"] = [{
            provider: 'Paste',
            providerlink: 'http://www.pastemagazine.com/articles/music/reviews/',
            backgroundImage: '../assets/white__denim.png'
        }];
        objPaste["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, albumName, image, rating, stars, soundcloud, idvalue, imagePath, coversionPath, date) {
            this.artist = artist
            this.albumName = albumName
            this.image = image
            this.rating = rating
            this.stars = stars
            this.soundcloud = soundcloud
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.coversionPath = coversionPath
            this.date = date

        }

        //loop through albums list and get individual parts
        $("form .tags-detail-wrapper #tags-detail-wrapper #landing-left-column .tags-detail-container ul.tagged-articles-list li:not('.ad , .mobile-ad')").each(function(index) {
            var artistName = $("a.title", this).text()//.replace('&amp;', '&').replace('&apos;', "'").replace('&#x2019;', "'").replace('<i>', '').replace('</i>', '');
            var artistNameSplit = artistName.split(':');
            var artist = artistNameSplit[0];
            var albumName = artistNameSplit[1];
            if (albumName == undefined){
	            albumName = " "
            }
            if (albumName.search('<i>') == "1"){
	         albumName = artistNameSplit[1].replace('<i>','').replace('</i>','');  
            }
            var imageLink = $("a.image", this).data('image-large'); 
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
            var coversionPath = 'imgs/paste/ ' + id + ".png";
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
				objPaste.artists[index].colorClass = colorClass;
				objPaste.artists[index].colour = cleanColour;
				objPaste.artists[index].bright = brightness;
				if(brightness >= 159){
					objPaste.artists[index].brightnessColor = '3,3,3';
					objPaste.artists[index].colorClass = 'black';
				}else{
					objPaste.artists[index].brightnessColor = '255,255,255'
					objPaste.artists[index].colorClass = 'white';
				}
				console.log(objPaste);
				 jf.writeFile(file, objPaste, function(err) {
					 console.log("this is not working", err)
    			})
			});
            
            objPaste.artists[index] = new albumInfo(artist, albumName, imageLink, ratingRound, StarRating, sClink, id, imagePath, coversionPath, date);
        });											

      /* objUncut = {};
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
		
	}*/		

        console.log(objPaste);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    
});