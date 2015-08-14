$(document).ready(function(){	
$('body').on("mouseenter", "img", function () {
	console.log("i've reached the top");
	var $players = $('.player');
    var $playButtons = $('.play');
    var $playing = $('.playing');
	var $currentTime = player.currentTime;
	var $duration = player.duration;
	
	function countdown(){
		
	};
    
    function onPlayClick(playButton, player, playingStamp) {
        if (player.paused) {
            player.play();
            $(playButton).html('<img src="assets/pause.svg">');
        	$(playingStamp).css('display','block');
        	$(playingStamp).html(countdown());


        } else {
            player.pause();
            $(playButton).html('<img src="assets/play-01.svg">');
           	$(playingStamp).css('display','none');
           	$(playingStamp).html($currentTime);

        }
    }
    
    for(var i = 0; i < $playButtons.length; i++) {
        var playButton = $playButtons[i];
        var player = $players[i];
        var playingStamp = $playing[i];
        //console.log(playing);
        $(playButton).click(onPlayClick.bind(null, playButton, player, playingStamp)); 
        }   

});
$('body').on("mouseleave", "img", function () {
   console.log('ive left the top');
});
}); 