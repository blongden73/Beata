var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://pitchfork.com/best/";

var jf = require('jsonfile');
var file = 'js/__api/__json/pitchforkData.json';
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
        function albumInfo(artist, albumName, image, idvalue, imagePath, conversionPath, albumPage, date) {
            this.artist = artist
            this.albumName = albumName
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
            this.conversionPath = conversionPath
            this.albumPage = albumPage
            this.date = date
        }

        //loop through albums list and get individual parts
        $("#best-new-albums .container-fluid ul li .album-small").each(function(index) {
            var artistName = $("a .artist-list li", this).text().replace('/', ' ');
            var albumName = $("a h2", this).text();
            var imageLink = $("a .artwork img", this).attr('src')
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/pitchfork/' + id + ".jpeg";
            var conversionPath = 'imgs/pitchfork/ ' + id + ".png";
            var albumPage = $("a", this).attr('href');
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
            
			obj.artists[index] = new albumInfo(artistName, albumName, imageLink, id, imagePath, conversionPath, albumPage, date);
			});            
        
        //log object 		
        console.log(obj);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});