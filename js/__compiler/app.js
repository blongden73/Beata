$.getJSON("js/__api/__json/rollingData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('AllMusic', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#colour__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$(".introSlide").append(template(data));
	
});

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


$.getJSON("js/__json/dataADMSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('ADM', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#ADM__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataRollingSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('rollingstone', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#rolling__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataPasteSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('paste', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#paste__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataTimeSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('TimeOut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#time__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataCOSSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('COS', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#COS__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

/*$.getJSON("js/__api/__json/UncutData.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('Uncut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#uncut__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});*/

$.getJSON("js/__json/dataAMSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('AllMusic', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#allMusic__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});


/*$.getJSON("js/__json/dataSpotify.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('pitchfork', JSON.stringify(json));
		
	var pitchfork__data = json;
	var source   = $("#pitchfork__template").html();
	var template = Handlebars.compile(source);
	var data = pitchfork__data;
	$("#music__container").html(template(data));
	
});


$.getJSON("js/__json/dataADMSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('ADM', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#ADM__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataRollingSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('rollingstone', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#rolling__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataPasteSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('paste', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#paste__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataTimeSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('TimeOut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#time__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataCOSSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('COS', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#COS__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataUncutSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('Uncut', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#uncut__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

$.getJSON("js/__json/dataAMSpotifyPreveiw.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('AllMusic', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#allMusic__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#music__container").append(template(data));
	
});

/*$.getJSON("js/__json/allProviders.json", function(json) {
	console.log(json);
	
	// Put the object into storage
	localStorage.setItem('AllProviders', JSON.stringify(json));
		
	var clash__data = json;
	var source   = $("#menu__template").html();
	var template = Handlebars.compile(source);
	var data = clash__data;
	$("#menu__container").append(template(data));
	
});*/





