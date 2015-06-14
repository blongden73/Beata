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
            src: ['js/api.js', 'js/clashApi.js', 'js/COSApi.js', 'js/pasteApi.js', 'js/rollingStoneApi.js', 'js/TimeOutApi.js', 'js/UncutApi.js']
        		}
    	},
    	
    	json: {
            prod: {
                options: {
                    namespace: 'JSON_DATA',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['js/**/*.json'],
                dest: 'src/json.js'
            }
        }
    			
	});
	
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-json');
	grunt.registerTask('default',['execute', 'sass', 'json', 'watch']);
}