$(document).ready(function(){	
$('body').on("mouseenter", "img", function () {
	console.log("i've reached the top");
	var $players = $('.player');
    var $playButtons = $('.play');
    var $playing = $('.playing');
	var $currentTime = $players.currentTime;
	var $duration = $players.duration;
    
    function onPlayClick(playButton, player, playingStamp) {
        if (player.paused) {
            player.play();
            $(playButton).html('<img src="assets/pause.svg">');
        	$(playingStamp).css('opacity','0.9');
        	player.addEventListener('timeupdate',function(){
				var currentTimeMs = player.currentTime;
			//console.log(Math.round(currentTimeMs));
				$(playingStamp).html(Math.round(player.duration) - Math.round(currentTimeMs));
				},false);
				
			
        } else {
            player.pause();
            $(playButton).html('<img src="assets/play-01.svg">');
           	//$(playingStamp).css('display','none');
           	//$(playingStamp).html(player.currentTime);
           	//var count = player.currentTime;
		   	//clearInterval(counter);
		   	//$(playingStamp).html(count);

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