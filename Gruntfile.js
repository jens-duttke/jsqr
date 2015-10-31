module.exports = function (grunt) {
	'use strict';

	/* Third-party packages */
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				banner: '/*\n\t<%= pkg.name %> - <%= pkg.description %> v<%= pkg.version %>\n\t<%= pkg.homepage %>\n\n\tCopyright 2011-2015, <%= pkg.author.name %>\n\tDual licensed under the MIT or GPL Version 2 licenses.\n\thttp://jsqr.de/license\n\n\tDate: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n(function (window, undefined) {\n',
				footer: '})(window);',
				stripBanners: true,
				separator: '\n',
				process: function (src, filepath) {
					return src.replace(/(^|\n)/g, '$1\t');
				}
			},
			dist: {
				src: ['src/input.js', 'src/code.js', 'src/matrix.js', 'src/encoder.js', 'src/main.js'],
				dest: '<%= pkg.distribution %>/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>.js'
			}
		},

		uglify: {
			options: {
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
