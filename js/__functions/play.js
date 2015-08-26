$(document).ready(function(){	
$('body').on("mouseenter", "img", function () {
	console.log("i've reached the top");
	var $players = $('.player');
    var $playButtons = $('.play');
    var $playing = $('.playing');
    var $playingName = $('.album__details h1');
	var $currentTime = $players.currentTime;
	var $duration = $players.duration;
	var $currentlyPlaying = $('.isPlaying');

    function onPlayClick(playButton, player, playingStamp, playingName) {
        if (player.paused && !$(player).hasClass('isPlaying')) {
            player.play();            
            $(player).addClass("isPlaying");
            $(playButton).html('<img src="assets/pause.svg">');
        	$(playingStamp).css('opacity','0.9');
        	player.addEventListener('timeupdate',function(){
				var currentTimeMs = player.currentTime;
				$(playingStamp).html(Math.round(player.duration) - Math.round(currentTimeMs));
			},false);
			document.addEventListener('play', function(e){
			var audios = document.getElementsByTagName('audio');
			for(var i = 0, len = audios.length; i < len;i++){
			if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);	
		}
		
        else {
            player.pause();
            $(playButton).html('<img src="assets/play-01.svg">');
            $(player).removeClass("isPlaying");
        }
    }
    
    for(var i = 0; i < $playButtons.length; i++) {
        var playButton = $playButtons[i];
        var player = $players[i];
        var playingStamp = $playing[i];
        var playingName =  $playingName;
        //console.log(playing);
        $(playButton).click(onPlayClick.bind(null, playButton, player, playingStamp, playingName)); 
        }
   
	

});
$('body').on("mouseleave", "img", function () {
   console.log('ive left the top');
});
}); 