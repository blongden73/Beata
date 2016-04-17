var json = require('./__json/pitchforkData.json');
console.log(json.artists[0].albumPage);
console.log(json.artists.length);

for(i = 0; i < json.artists.length; i++){
	console.log(json.artists[i].albumPage);
	var request = require("request"),
	    cheerio = require("cheerio"),
	    url = 'http://pitchfork.com' + json.artists[i].albumPage;
	
	var jf = require('jsonfile');
	var file = 'js/__api/__json/pitchforkScoreData.json';
	
	request(url, function(error, response, body) {
	    if (!error) {
	        var $ = cheerio.load(body),
	          obj = {};
        obj["provider"] = [{
            provider: 'Pitchfork',
            providerlink: 'http://pitchfork.com/reviews/best/albums/',
            colour: '#ef4135',
            backgroundImage: '../assets/white__denim.png'

        }];
        obj["artists"] = [];
        //create new object titles for albums 
        function albumInfo(score) {
            this.score = score
        }

        //loop through albums list and get individual parts
        $(".review-detail .review-article .tombstone .row").each(function(index) {
	            var score = $(".score-box .score-circle .score", this).text();
	            var ratingRound = Math.round(score);
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
	            var artistName = $("hgroup .artists ul li a", this).text().replace('/', ' ');
	            for(j = 0; j < json.artists.length; j++){
		            if(artistName === json.artists[j].artist){
			           json.artists[j].score = score;
			           json.artists[j].ratingRound = ratingRound;
			           json.artists[j].stars = StarRating;   
			           console.log(artistName);
			           console.log(json.artists[j].artist);
			           console.log(json);
			        jf.writeFile(file, json, function(err) {
					 console.log("this is not working", err)
    				})   
		            }
	            };        
				obj.artists[index] = new albumInfo(score);
			});  

	    } else {
	        console.log("We’ve encountered an error: " + error);
	    }
	});
}	