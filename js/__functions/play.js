$(document).ready(function(){
$('#music__container').on("mouseenter", "img", function () {
	var $players = $('.player');
    var $playButtons = $('.play');
    
    function onPlayClick(playButton, player) {
        if (player.paused) {
            player.play();
            $(playButton).html('<img src="assets/play-01.svg">');
        } else {
            player.pause();
            $(playButton).html('<img src="assets/pause.svg">');
        }
    }
    
    for(var i = 0; i < $playButtons.length; i++) {
        var playButton = $playButtons[i];
        var player = $players[i];
        
        $(playButton).click(onPlayClick.bind(null, playButton, player));  
    }   

});
$('#music__container').on("mouseleave", "img", function () {
   console.log('ive left the top');
});
}); 