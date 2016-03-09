    $(document).ready(function() {
		setTimeout(function(){	
		  $('.provider__position').each(function(){
	    	var top = 0;
	    	var selection = $(this);	    	
	    	$(window).scroll(function(){
		    	var providerPos = selection.offset().top - $(window).scrollTop();
		    	if(providerPos <= top){
			    	selection.next().addClass('fixed');
		    	}else{
			    	selection.next().removeClass('fixed');
		    	}
	    	});
    	  });  
    	}, 2000);	
        
    });