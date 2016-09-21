var walk    = require('walk');
var files   = [];
var fs = require('fs');

// Walker options
var walker  = walk.walk(process.cwd(), { followLinks: false });

walker.on('file', function(root, stat, next) {
    files.push(root + '/' + stat.name);
    next();
});

walker.on('end', function() {
	var regex = /-\d+x\d+\./;

	files.forEach(function (file) {
		if (regex.test(file)) {
			fs.unlinkSync(file);
		}
	});

	console.log('DONE');
});