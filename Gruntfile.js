module.exports = function (grunt) {
	'use strict';

	/* Third-party packages */
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				stripBanners: true,
				separator: '\n',
				process: function (src, filepath) {
					switch (filepath) {
						case 'src/intro.js':
							return src.replace(/@([A-Z]+)/g, function (match, $1) {
								var param = $1.toLowerCase();

								switch (param) {
									case 'today':
										return grunt.template.today("yyyy-mm-dd");
									case 'year':
										return grunt.template.today("yyyy");
									case 'author':
										return grunt.config.data.pkg.author.name;
									default:
										return grunt.config.data.pkg[param] || '';
								}
							});
						case 'src/outro.js':
							return src;
						default:
							return src.replace(/(^|\n)/g, '$1\t');
					}
				}
			},
			dist: {
				src: ['src/intro.js', 'src/input.js', 'src/code.js', 'src/matrix.js', 'src/encoder.js', 'src/main.js', 'src/outro.js'],
				dest: '<%= pkg.distribution %>/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>.js'
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				screwIE8: false,
				sourceMap: true
			},
			dist: {
				options: {
					maxLineLen: 10
				},
				files: {
					'<%= pkg.distribution %>/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>-min.js': '<%= pkg.distribution %>/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>.js'
				}
			}
		}
	});

	grunt.registerTask('default', ['concat:dist', 'uglify:dist']);
};
