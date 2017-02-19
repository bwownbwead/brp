module.exports = function(grunt) {

	'use strict';

	var config = {

		sass: {

			dev: {
				options: {
					style: 'nested',
					sourcemap: 'file'
				},

				files: {
					'assets/dist/css/combined.min.css': 'assets/src/scss/main.scss'
				}
			},

			live: {
				options: {
					style: 'compressed',
					sourcemap: 'file'
				},

				files: {
					'assets/dist/css/combined.min.css': 'assets/src/scss/main.scss'
				}
			}
		},

		cssmin: {

			options: {
				sourceMap: true
			},

			live: {
				files: {
					'assets/css/combined.min.css': [
						'assets/css/combined.min.css'
					]
				}
			}
		},

		uglify : {

			dev: {
				options: {
					mangle : true,
					preserveComments: false,
					sourceMap: true
				},

				files : {

					// Main application
					'assets/dist/js/combined.min.js' : 'assets/dist/js/project.webpacked.js'
				}
			}
		},

		webpack: {
			main: {
				entry: "./assets/src/js/project.js",
				output: {
					path: "./assets/dist/js/",
					filename: "project.webpacked.js",
				},

				devtool: 'source-map',
				watch: true,
				keepalive: true,

				module: {
					loaders: [
						{
							test: /\.js$/,
						    exclude: /(node_modules)/,
						    loader: 'babel',
						    query: {
						    	presets: ['es2015']
						    }
						},
						{
							test: require.resolve("jquery"), 
							loader: "expose-loader?$!expose-loader?jQuery"
						}
					]
				}
			}
		},

		smushit: {
			live: {
				src: [
					'assets/images/{,*/}*.{png,jpg,gif}'
				]
			}
		},

		autoprefixer: {
            dist: {
                files: {
                    'assets/dist/css/combined.min.css': 'assets/dist/css/combined.min.css'
                }
            },
            options: {
	        	browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'Opera 12.1']
		    }
        },

		svgstore: {
			options: {
				prefix : 'icon-', // This will prefix each <g> ID
			},
			default : {
				files: {
					'assets/dist/images/svg-defs.svg': ['assets/src/svg/*.svg'],
				}
			}
		},

		watch: {

			sass: {
				files: ['assets/src/scss/{,*/}{,*/}{,*/}*.scss'],
				tasks: ['sass:dev', 'autoprefixer']
			},

			copy: {
				files: ['assets/dist/css/*'],
				tasks: ['copy:main']
			},

			svg: {
				files: ['assets/src/svg/*.svg'],
				tasks: ['svgstore'],

				options: {
					livereload: true
				}
			},

			config: {
				files: ['Gruntfile.js'],

				options: {
					reload: true
				}
			}
		},

		// watch and webpack have separate watchers
		// so using concurrent to run both
		concurrent: {
	        target: ['watch', 'webpack'],
			options: {
				logConcurrentOutput: true
			}
	    },

	    copy: {
	    	main: {
	    		files: [{
                    expand: true,
                    cwd: 'assets/dist/css/',
                    src: ['*'],
                    dest: 'component-library/public/'
                }],
	    	},

	    	components: {
	    		files: [{
                    expand: true,
                    cwd: 'assets/src/scss/components/',
                    src: ['_components.attention-bar.scss'],
                    dest: 'component-library/components/common/'
                }],
	    	}
	    }
	};

	// Turn off source maps for uglify:live
	config.uglify.live = JSON.parse(JSON.stringify(config.uglify.dev));
	config.uglify.live.options.sourceMap = false;

	// Configure
	grunt.initConfig(config);

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('copycomponents', ['copy:components']);
	grunt.registerTask('images', ['smushit:live']);
	grunt.registerTask('dev', ['copy:main', 'sass:dev', 'autoprefixer', 'svgstore', 'concurrent:target']);
	grunt.registerTask('live', ['sass:live', 'uglify:live', 'cssmin:live']);

};
