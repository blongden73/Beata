var request = require("request"),
	cheerio = require("cheerio"),
	clashurl = "http://www.clashmusic.com/reviews/major-lazer-peace-is-the-mission";

var jf = require('jsonfile');	
var file = 'js/dataClashSingle.json';

	
request(clashurl, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			//Set up output object
				objClash = {};
	objClash["artists"] = [];
	//create new object titles for albums 
		function albumInfo(rating){
    		this.rating = rating
			
}

//loop through albums list and get individual parts
$(".field-name-body .field-item").each(function(index){
	var rating = $("p > strong", this).html();
			objClash.artists[index] = new albumInfo(rating);
	});
						
				
				
			
		console.log(objClash);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
	
	//write to json
jf.writeFile(file, objClash, function(err) {
	console.log("this is not working", err)
})
	
	
});

