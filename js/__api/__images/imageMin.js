/*
var gm = require('gm');
var fs = require('fs');
/*
gm('test/hotchip.jpeg')
.resize(240, 240)
.noProfile()
.write('test/min', function (err) {
  if (!err) console.log('done');
});
*/

/*
gm('test/hotchip.jpeg')
.resize(240, 240, '!')
.write('/path/to/resize.png', function (err) {
  if (!err) console.log('done');
});
*/

/*
gm('test/hotchip.jpeg')
.resize('200', '200')
.stream(function (err, stdout, stderr) {
  var writeStream = fs.createWriteStream('test/min/hotchip_edited.jpeg');
  stdout.pipe(writeStream);
});
*/

var ImageMagick = require("imagemagick");

// convert the image
ImageMagick.convert([
    "hotchip.jpeg"
  , '-resize'
  , "200x100"
  , "output.png"
], function(err, stdout){
    if (err) { throw err; }
    console.log(">> Done");
});