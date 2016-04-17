module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'style/style.css' : 'style/style.scss'
				}
			}
		},
		
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
			
		},
		
		
		execute: {
        target: {
            src: [
           'js/__api/__images/ADMimage.js', 
            'js/__api/__data/ADM.js', 
            'js/__api/spotifyADM.js',
            'js/__api/spotifyADMPreveiw.js',
			'js/__api/__images/pitchforkImages.js', 
            'js/__api/__data/pitchfork.js',
            'js/__api/pitchforkRatings.js',
            'js/__api/spotify.js',
	        'js/__api/spotifyPreveiw.js',
            'js/__api/__images/COSApiImages.js',
            'js/__api/__data/COSApi.js',
            'js/__api/spotifyCOS.js',
            'js/__api/spotifyCOSPreview.js', 
            'js/__api/__images/pasteApiImages.js', 
            'js/__api/__data/pasteApi.js',
            'js/__api/spotifyPaste.js', 
            'js/__api/spotifyPastePreview.js' ,
            'js/__api/__images/rollingStoneApiImages.js', 
            'js/__api/__data/rollingStoneApi.js',
            'js/__api/spotifyRolling.js',
            'js/__api/spotifyRollingPreview.js', 
            'js/__api/__images/TimeOutApiImages.js',
            'js/__api/__data/TimeOutApi.js',
            'js/__api/spotifyTimeOut.js',
            'js/__api/spotifyTimeOutPreview.js', 
            'js/__api/__images/AllMusicApiImages.js', 
            'js/__api/__data/AllMusicApi.js',
            'js/__api/spotifyAM.js',
            'js/__api/spotifyAMPreview.js',
            'js/jsonextractor.js',
            'js/albumIds.js',
            'js/trackIds.js',
             
            ]
        		}
    	},
    	
    	json: {
            prod: {
                options: {
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['js/__json/**/*.json'],
                dest: 'src/Datajson.js'
            }
        },
        
        'ftp-deploy': {
		  build: {
		    auth: {
		      host: '107.180.4.39',
		      port: 21,
		      authKey: 'key1'
		    },
		    src: 'style',
		    dest: '/Beata/Style',
		    exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
		  },
		  
		  js: {
		    auth: {
		      host: '107.180.4.39',
		      port: 21,
		      authKey: 'key1'
		    },
		    src: 'js',
		    dest: '/Beata/js',
		    exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
		  } 			
	});
	
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-json');
	grunt.registerTask('default',['execute', 'sass', 'json', 'watch']);
	grunt.registerTask('run', ['execute']);
	grunt.registerTask('deploy', ['ftp-deploy']);
	grunt.registerTask('changes', ['sass', 'watch']);
}