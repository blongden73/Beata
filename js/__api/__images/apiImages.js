var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://pitchfork.com/reviews/best/albums/";

var fs = require('fs');


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
        function albumInfo(artist, image, idvalue, imagePath) {
            this.artist = artist
            this.image = image
            this.idvalue = idvalue
            this.imagePath = imagePath
        }

        //loop through albums list and get individual parts
        $("ul.object-list.bnm-list > li").each(function(index) {
            var artistName = $(".info h1", this).text();
            var imageLink = $("a .artwork .lazy", this).data('content').replace(" <img src=\"", "").replace("\" /> ", "").replace('\n', '').replace('" />\n','').trim();
            var id = artistName.replace(/\s+/g, '').toLowerCase();
            var imagePath = 'imgs/pitchfork/' + id + ".jpeg";
            obj.artists[index] = new albumInfo(artistName, imageLink, id, imagePath);
        });

        // Loop through object 			
        for (var i = 0; i < obj.artists.length; i++) {
            //set up fucntion for download	
            var download = function(uri, filename, callback) {
                // set request params			
                request.head(uri, function(err, res, body) {
                    console.log('content-type:', res.headers['content-type']);
                    console.log('content-length:', res.headers['content-length']);
                    //request file and stream 
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            //download file set image path and define filename
            download(obj.artists[i].image, 'imgs/pitchfork/' + obj.artists[i].idvalue + '.jpeg', function() {
                console.log('done');
            });
        };

        //log object 		
        console.log(obj);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});