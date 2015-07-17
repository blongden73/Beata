$.getJSON("js/__json/dataSpotify.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('pitchfork', JSON.stringify(json));
		
	var pitchfork__data = json;
	var source   = $("#pitchfork__template").html();
	var template = Handlebars.compile(source);
	var data = pitchfork__data;
	$("#music__container").html(template(data));
	
});


$.getJSON("js/__json/dataSpotifyADM.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('ADM', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#ADM__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__ADM__container").html(template(data));
	
});

$.getJSON("js/__json/dataSpotifyRolling.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('rollingstone', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#rolling__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__rolling__container").html(template(data));
	
});

$.getJSON("js/__json/dataSpotifyPaste.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('paste', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#paste__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__paste__container").html(template(data));
	
});

$.getJSON("js/__json/dataSpotifyTime.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('TimeOut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#time__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__time__container").html(template(data));
	
});

$.getJSON("js/__json/dataSpotifyCOS.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('COS', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#COS__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__COS__container").html(template(data));
	
});

$.getJSON("js/__json/dataSpotifyUncut.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('Uncut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#uncut__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__uncut__container").html(template(data));
	
});

$.getJSON("js/__json/dataSpotifyAM.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('AllMusic', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#allMusic__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__allMusic__container").html(template(data));
	
});

$.getJSON("js/__json/allProviders.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('AllProviders', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#menu__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#menu__container").html(template(data));
	
});



