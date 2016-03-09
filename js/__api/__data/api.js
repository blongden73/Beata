var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://pitchfork.com/reviews/best/albums/";

var jf = require('jsonfile');
var file = 'js/__api/__json/data.json';
var fs = require('fs');
var ce = require('colour-extractor');

request(url, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            obj = {};
        obj["provider"] = [{
            provider: 'Pitchfork',
            providerlink: 'http://pitchfork.com/reviews/best/albums/',
            colour: '#ef4135',
            backgroundImage: '../assets/white__denim.png'

        }];
        obj["artists"] = [];
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
        $("ul.object-list.bnm-list > li").each(function(index) {
            var artistName = $(".info h1", this).text()//.decodeURI();
            var albumName = $(".info h2", this).text()//.replace("&#x2019", "'").replace("&#x2019", "'").replace("\" />", "").replace("\" />", "").replace(";", "").replace(";", "");
            var imageLink = $("a .artwork .lazy", this).data('content').replace(" <img src=\"", "").replace("\" /> ", "").replace('\n', '').replace('" />\n','').trim();
            var ratingNo = $(".info .score", this).html().replace('\n', '').replace('" />\n','').trim();
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
            var sClink = $(".info .reveiw-audio ul li .p4k-player-track", this).data('href');
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/pitchfork/' + id + ".jpeg";
            var conversionPath = 'imgs/pitchfork/ ' + id + ".png";
            var date = new Date().toJSON().slice(0,10);
            
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
				obj.artists[index].colour = cleanColour;
				obj.artists[index].bright = brightness;
				obj.artists[index].colorClass = colorClass;
				if(brightness >= 159){
					obj.artists[index].brightnessColor = '3,3,3';
					obj.artists[index].colorClass = 'black';
				}else{
					obj.artists[index].brightnessColor = '255,255,255'
					obj.artists[index].colorClass = 'white';
				}
				console.log(obj);
				 jf.writeFile(file, obj, function(err) {
					 console.log("this is not working", err)
    			})
			});
            
			obj.artists[index] = new albumInfo(artistName, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, conversionPath, date);
			});            
        
        //log object 		
        console.log(obj);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});