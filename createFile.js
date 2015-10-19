//creation a new file. Name of file = fileName.extension, e.g. NewFile.cpp
var fs = require('fs');
var PATH = "/home/";
function createFile (fileName, extension, data) {
	fs.writeFile(PATH+fileName+'.'+extension, data,function(err) {
	    if(err) throw err;
	    console.log("The file was created!");
	});
}
exports.createFile = createFile;
