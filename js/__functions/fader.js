$(document).ready(function () {

	
	var image = $('.img');
	$(image).load(function(){
		console.log('this is an image', $('.img').length);
	});
/*
    function fadein(){
    $('img.one').delay(1000).fadeTo('slow', 0)
    $('img.two').delay(1000).fadeTo('slow', 1)
    $('img.two').delay(2500).fadeTo('slow', 0)
    $('img.three').delay(2500).fadeTo('slow', 1)
    $('img.three').delay(4000).fadeTo('slow', 0)
    $('img.four').delay(4500).fadeTo('slow', 1)
    $('img.four').delay(5000).fadeTo('slow', 0)
    $('img.one').delay(8500).fadeTo('slow', 1)
	}
    
    window.setInterval(function(){
	fadein();
}, 15000);
    
*/

});