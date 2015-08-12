var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://pitchfork.com/reviews/best/albums/";

var jf = require('jsonfile');
var file = 'js/__api/__json/data.json';
var fs = require('fs');
var ColorThief = require('color-thief');
var SpotifyWebApi = require('spotify-web-api-node');

request(url, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            obj = {};
        obj["provider"] = [{
            provider: 'Pitchfork',
            url: 'http://www.pitchfork.com',
            colour: '#ef4135'

        }];
        obj["artists"] = [];
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
        $("ul.object-list.bnm-list > li").each(function(index) {
            var artistName = $(".info h1", this).html().replace("&apos;", "'").replace('&amp;', '&');
            var albumName = $(".info h2", this).html();
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
            var colorThief = new ColorThief();
            var colourObj = colorThief.getColor(imagePath);
            var colour = colourObj.toString();
            obj.artists[index] = new albumInfo(artistName, albumName, imageLink, ratingNo, StarRating, sClink, id, imagePath, colour);
           	});
        
        
				
		//Write a new object with Artist name and id
		//Look at the name of the artist and the id and bring objects together
		//write json file 
        


        //log object 		
        console.log(obj);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

    //write to json
    jf.writeFile(file, obj, function(err) {
        console.log("this is not working", err)
    })
});