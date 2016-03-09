$(document).ready(function(){	
	setTimeout(function(){				
		var img = $('.album__image img');
		for(i = 0; i < img.length; i++){
			if(img[i].height !== img[i].width){
				function formatImage(){
					console.log(img[i])
					$(img[i]).addClass('notsquare');
				};
				formatImage();
			}  			
		}
	}, 1000);	
});