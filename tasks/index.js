module.exports = function (grunt) {
	'use strict';

	var fontCarrier = require('font-carrier');
	var path  = require('path');
	var _ = grunt.util._;
	var fs = grunt.file;

	grunt.registerMultiTask('grunt-font-generator', 'Generate web fonts', function() {

		this.files.forEach(function (file) {
			var font = fontCarrier.create();
			var srcPath = path.dirname(file.src);
			var destPath = path.dirname(file.dest);
			var fontName = path.basename(file.dest, '.json');

			_.each(fs.readJSON(file.src), function (svgFilePath, charCode) {
				var svgFile = fs.read(path.resolve(srcPath, svgFilePath.replace(/\.svg$/i, '') + '.svg'));
				font.setSvg('&#x' + charCode + ';', svgFile);
			});

			fs.mkdir(destPath);
			font.output({
				path: destPath + '/' + fontName
			});
		});
	});
}