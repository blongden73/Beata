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

