$(document).ready(function(){
	setTimeout(function(){		
		console.log('playlist ready', $('.spotify__playlist'));
		$('.spotify__playlist').click(function(e) {
			console.log('clicked');
		    // Set Track ID
		    var track = $(this).data('track');
		    console.log($(this).data('track'));
		    $(this).spotify_add_to_playlist({
		        // Playlist Name - can be whatever you like
		        playlist_name:'Beata',
		        // Client ID from your Spotify application in step 2
		        client_id:'06b26dc80c104d4586bb08c11614856a',
		        // Track Spotify ID
		        track: track
		    });
		    e.preventDefault();
		});
	}, 1000);	
});	
