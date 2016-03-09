var request = require("request"),
    cheerio = require("cheerio"),
    clashurl = "http://www.allmusic.com/newreleases";

var fs = require('fs');


request(clashurl, function(error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            //Set up output object
            objAllMusic = {};
        objAllMusic["provider"] = [{
            provider: 'All Music'
        }];
        objAllMusic["artists"] = [];
        //create new object titles for albums 
        function albumInfo(artist, image, idvalue, imageName, imagePath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imageName = imageName
            this.imagePath = imagePath
        }

        //loop through albums list and get individual parts
        $(".featured-rows .row .featured").each(function(index) {
		   	var artistCheck = $(".artist a", this).html();  
		   	if(artistCheck !== null){
				var artistName = $(".artist a", this).text().replace(',',' ').replace('(',' ').replace(')', ' ');   	
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
            var imageCheck = $(".album-cover a img.lazy", this).data('original');
            var imageLink = $(".album-cover a img.lazy", this).data('original');
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imageName = "allmusic" + index;
            var imagePath = 'imgs/all__music/' + imageName + ".jpeg";
            objAllMusic.artists[index] = new albumInfo(artistName, imageLink, id, imageName, imagePath);
        });

       for (var i = 0; i < objAllMusic.artists.length; i++) {
            var download = function(uri, filename, callback) {
                request.head(uri, function(err, res, body) {
                    console.log('content-type:', res.headers['content-type']);
                    console.log('content-length:', res.headers['content-length']);
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
			if( objAllMusic.artists[i].image !== undefined){
            download(objAllMusic.artists[i].image, 'imgs/all__music/' + objAllMusic.artists[i].imageName + '.jpeg', function() {
                console.log('done');
            });}
        };


        console.log(objAllMusic);
    } else {
        console.log("We’ve encountered an error: " + error);
    }

});