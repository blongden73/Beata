$(document).ready(function(){	
	$('.about').click(function(){
		$('.overlay').addClass('display');
	});
	$('.close').click(function(){
		$('.overlay').removeClass('display');
	});
});