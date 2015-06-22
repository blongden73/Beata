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
            src: ['js/__api/apiImages.js', 'js/__api/api.js', 'js/__api/clashApi.js', 'js/__api/COSApiImages.js', 'js/__api/COSApi.js', 'js/__api/pasteApiImages.js', 'js/__api/pasteApi.js', 'js/__api/rollingStoneApiImages.js', 'js/__api/rollingStoneApi.js', 'js/__api/TimeOutApiImages.js', 'js/__api/TimeOutApi.js', 'js/__api/UncutApiImages.js', 'js/__api/UncutApi.js', 'js/__api/AllMusicApiImages.js', 'js/__api/AllMusicApiImages.js', 'js/__api/AllMusicApi.js', 'js/__api/__ADMImage.js', 'js/__api/__ADM.js']
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
                dest: 'src/Datajson.json'
            }
        }
    			
	});
	
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-json');
	grunt.registerTask('default',['execute', 'sass', 'json', 'watch']);
}