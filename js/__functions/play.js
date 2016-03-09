$(document).ready(function(){	
setTimeout(function(){
	console.log("i've reached the top");
	var $players = $('.player');
    var $playButtons = $('.play');
    var $playing = $('.playing');
    var $playingName = $('.album__details h1');
	var $currentTime = $players.currentTime;
	var $duration = $players.duration;
	var $currentlyPlaying = $('.isPlaying');
	var $global__player = $('.global__player');
	var $play__time = $('.play__time');
	
	function changeTrack(sourceUrl, artistName) {
	    var audio = $(".global__player");      
	    $(".player__track").attr("src", sourceUrl);
	    $(".global__artist__name").html(artistName);
		/****************/
	    audio[0].pause();
	    audio[0].load();
	    audio[0].oncanplaythrough = audio[0].play();
	    /****************/
	}
	$(document).on("click", '#play', function (){
			 $global__player[0].play(); $(this).attr('id', 'pause-bt');
			 $('.play__button').css('background-image','url("../assets/pause.svg")'); 
		}); 
	$(document).on('click', '#pause-bt', function (){ 
       $global__player[0].pause(); $(this).attr('id', 'play');
       $('.play__button').css('background-image','url("../assets/play-01.svg")'); 
    });	
	//individual elements play button 
	$('.play').click(function(){
	    load_track = $(this).attr('data-audio');//gets me the url of the new track
	    artist_name = $(this).attr('data-artist');
	    changeTrack(load_track, artist_name);// function to change the track of the loaded audio player without page refresh preferred...
	    $(this).addClass('playng');
	    $('.audio__player').css('margin-bottom','0px');
	    $('.play.white').not(this).removeClass('playng').css('background-image','url("../assets/play-01.svg")');
   	    $('.play.black').not(this).removeClass('playng').css('background-image','url("../assets/play-black.svg")');	       
	    $('#play').attr('id', 'pause-bt');
	    $('.play__button').css('background-image','url("../assets/pause.svg")');
	    $(this).css('background-image','url("../assets/replay.svg")');
		});
	  //update the time for the player  
	    $global__player[0].addEventListener('timeupdate',function(){
			var currentTimeMs = $global__player[0].currentTime;
			$($play__time).html(Math.round($global__player[0].duration) - Math.round(currentTimeMs));
		},false);
	}, 1000);
});	





/*
		if($global__player[0].paused && !$(this).hasClass("loaded")){
			load_track = $('.play').first().attr('data-audio');
			artist_name = $('.play').first().attr('data-artist');
			changeTrack(load_track, artist_name);
			$(this).addClass('loaded');
		}else if($global__player[0].paused && $(this).hasClass("loaded")){
			$global__player[0].play();
		}else{
			$global__player[0].pause();
			$(this).removeClass('pause');
		}
*/


/*

    function onPlayClick(playButton, player, playingStamp, playingName) {
        if (player.paused) {
            player.play();            
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
*/
/*
$('body').on("mouseleave", "img", function () {
   console.log('ive left the top');
});
*/
