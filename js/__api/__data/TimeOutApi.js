var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.timeout.com/london/music/album-reviews";

var jf = require('jsonfile');	
var file = 'js/__api/__json/TimeOutData.json';
var fs = require('fs');
var ce = require('colour-extractor');

	
	request(clashurl, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body),
				//Set up output object
					objTimeOut = {};
		objTimeOut["provider"] = [{
			provider : 'Time Out',
            providerlink: 'http://www.timeout.com/london/music/album-reviews',
            backgroundImage: '../assets/royal__blood.png'
			}] ;						
		objTimeOut["artists"] = [];
		//create new object titles for albums 
			function albumInfo(artist, albumName, image, rating, stars, soundcloud, idvalue, imagePath, coversionPath, date){
	    		this.artist = artist
				this.albumName = albumName
				this.image = image
				this.rating = rating
				this.stars = stars
				this.soundcloud = soundcloud
				this.idvalue = idvalue
				this.imagePath = imagePath
				this.conversionPath = coversionPath
				this.date = date
	}
	
	//loop through albums list and get individual parts
	$(".four_column_grid .tiles .tile.category_5").each(function(index){
		var artistName = $(".tile__content .tile__body .tile__text h3.tile__title", this).text()//.replace('\n\t\t\t\t\t\t', '').replace('&#x2013;', '-').replace('&#x2018;', '').replace('&#x2019;', '').replace('\n\t\t\t\t\t', '').replace('&amp;','&').replace('+', 'And').replace('/\s$/', '');
		var artistNameSplit = artistName.split('–');
		var artist = artistNameSplit[0].trim();
		var albumName = artistNameSplit[1];
		var imageLink = $(".tile__content .image_wrapper img", this).attr('src');
		var rating = $(".tile__content .tile__bottom_rail .timeout_rating .icon_highlight", this).length;
		var ratingNo = rating.toString();
		var ratingRound = Math.round(ratingNo);
		var StarRating;
		if (ratingRound == 1){
			StarRating = 'one'
		}
		else if(ratingRound == 2){
			StarRating = 'two'
		}
		
		else if (ratingRound == 3){
			StarRating = 'three'
		}
		else if (ratingRound == 4){
			StarRating = 'four'
		}
		else if (ratingRound == 5){
			StarRating = 'five'
		}
		var sClink = $(".text-wrap .node-title a", this).attr('href');
		var id = artist.replace(/\s+/g, '').toLowerCase();
		var imagePath = 'imgs/time__out/' + id + ".jpeg";
        var coversionPath = 'imgs/time__out/ ' + id + ".png";
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
				objTimeOut.artists[index].colorClass = colorClass;
				objTimeOut.artists[index].colour = cleanColour;
				objTimeOut.artists[index].bright = brightness;
				if(brightness >= 159){
					objTimeOut.artists[index].brightnessColor = '3,3,3';
					objTimeOut.artists[index].colorClass = 'black';
				}else{
					objTimeOut.artists[index].brightnessColor = '255,255,255'
					objTimeOut.artists[index].colorClass = 'white';
				}
				console.log(objTimeOut);
				 jf.writeFile(file, objTimeOut, function(err) {
					 console.log("this is not working", err)
    			})
			});
        
		objTimeOut.artists[index] = new albumInfo(artist, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, coversionPath, date);
		});


		/*objBestTime = {};
	objBestTime["provider"] = [{provider : 'Time Out', url : 'http://www.timeout.com'}];
	objBestTime["artists"] = [];
			
	for(var i = 0; i < objTimeOut.artists.length; i++){
		if(objTimeOut.artists[i].rating == "4"){	
		objBestTime.artists.push(objTimeOut.artists[i]);
		}
		else if(objTimeOut.artists[i].rating == "5"){	
		objBestTime.artists.push(objTimeOut.artists[i]);
		}
		
	}	*/	
	
		
		console.log(objTimeOut);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json

	
});
