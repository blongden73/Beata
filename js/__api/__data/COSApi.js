var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://consequenceofsound.net/category/reviews/album-reviews/cos-top-rated/";

var jf = require('jsonfile');
var file = 'js/__api/__json/COSData.json';
var fs = require('fs');
var ce = require('colour-extractor');



request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objCOS = {};
        objCOS["provider"] = [{
            provider: 'Consequences of Sound',
            providerlink: 'http://consequenceofsound.net/category/reviews/album-reviews/cos-top-rated/',
            backgroundImage: '../assets/fka_twigs.png'
        }];
        objCOS["artists"] = [];
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
        $(".modules-grid #tab-everything .post").each(function(index) {
            var artistName = $(".content > h1 > a", this).text().replace('Album Review:', '')//.replace('Album Review:', '').replace('&#x2013;', '-').replace('&#xA0;', ' ').replace('&#xF6;', 'ö');
            var artistSplit = artistName.split('–');
            var artist = artistSplit[0].trim();
            var albumName = artistSplit[1];
            var imageLink = $('a .image img', this).data('lazy-src');
            var ratingNo = $(".grade-badge", this).text();
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
            var conversionPath = 'imgs/COS/' + id + ".png";
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
				objCOS.artists[index].colorClass = colorClass;
				objCOS.artists[index].colour = cleanColour;
				objCOS.artists[index].bright = brightness;
				if(brightness >= 159){
					objCOS.artists[index].brightnessColor = '3,3,3';
					objCOS.artists[index].colorClass = 'black';
				}else{
					objCOS.artists[index].brightnessColor = '255,255,255';
					objCOS.artists[index].colorClass = 'white';
				}
				console.log(objCOS);
				 jf.writeFile(file, objCOS, function(err) {
					 console.log("this is not working", err)
    			})
			});
            
            objCOS.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, conversionPath, date);            
        });


        console.log(objCOS);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

});