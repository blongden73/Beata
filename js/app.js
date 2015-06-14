$.getJSON("js/data.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('pitchfork', JSON.stringify(json));
		
	var pitchfork__data = json;
	var source   = $("#pitchfork__template").html();
	var template = Handlebars.compile(source);
	var data = pitchfork__data;
	$("#music__container").html(template(data));
	
});

$.getJSON("js/dataClash.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('clash', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#clash__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__clash__container").html(template(data));
	
});

$.getJSON("js/rollingData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('rollingstone', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#rolling__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__rolling__container").html(template(data));
	
});

$.getJSON("js/PasteData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('paste', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#paste__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__paste__container").html(template(data));
	
});

$.getJSON("js/TimeOutData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('TimeOut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#time__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__time__container").html(template(data));
	
});

$.getJSON("js/COSData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('COS', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#COS__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__COS__container").html(template(data));
	
});

$.getJSON("js/UncutData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('Uncut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#uncut__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__uncut__container").html(template(data));
	
});

$.getJSON("js/AllMusicData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('AllMusic', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#allMusic__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__allMusic__container").html(template(data));
	
});

/*

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('pitchfork'); 
var clashreceived = localStorage.getItem('clash');
var allmusicreceived = localStorage.getItem('AllMusic');
var COSreceived = localStorage.getItem('COS');
var pastereceived = localStorage.getItem('paste');
var rollingstonereceived = localStorage.getItem('rollingstone');
var timeoutreceived = localStorage.getItem('TimeOut');
var uncutreceived = localStorage.getItem('Uncut');
var pitchforkData = JSON.parse(retrievedObject); //Done
var clashData = JSON.parse(clashreceived); // Done
var allmusicData = JSON.parse(allmusicreceived); //Done
var COSData = JSON.parse(COSreceived); //Done
var pasteData = JSON.parse(pastereceived); // Done
var rollingstoneData = JSON.parse(rollingstonereceived); // Done
var timeoutData = JSON.parse(timeoutreceived); //Done
var uncutData = JSON.parse(uncutreceived); //Done

var allData = [];

for(var i = 0; i < pitchforkData.artists.length; i+=1){
allData.push(pitchforkData.artists[i].artist);
};
for(var i = 0; i < clashData.artists.length; i+=1){
allData.push(clashData.artists[i].artist);
};
for(var i = 0; i < allmusicData.artists.length; i+=1){
allData.push(allmusicData.artists[i].artist);
};
for(var i = 0; i < COSData.artists.length; i+=1){
allData.push(COSData.artists[i].artist);
};
for(var i = 0; i < pasteData.artists.length; i+=1){
allData.push(pasteData.artists[i].artist);
};
for(var i = 0; i < rollingstoneData.artists.length; i+=1){
allData.push(rollingstoneData.artists[i].artist);
};
for(var i = 0; i < timeoutData.artists.length; i+=1){
allData.push(timeoutData.artists[i].artist);
};
for(var i = 0; i < uncutData.artists.length; i+=1){
allData.push(uncutData.artists[i].artist);
};

for(var i=0; i < allData.length; i++) {
 allData[i] = allData[i].toLowerCase().replace(' ', '').replace(' ', '').replace('&#xf1;', 'ñ').replace('&amp;', '&');
}

//console.log('all data recieved', allData);


function compressArray(original) {
 
	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
 
	return compressed;
};
 
// It should go something like this:
 
var newArray = compressArray(allData);
//console.log('new array', newArray);
 
topArray = []; 
 
for(var i = 0; i < newArray.length; i++ ){
	if(newArray[i].count >= 3){
		var TopList = newArray[i].value;
		console.log(TopList);
	}
}

//console.log('top array', topArray);


*/








































