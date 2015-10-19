var codeFile = require("./createFile");
var compilator =require("./compilation");

codeFile.createFile("newFile","cpp","new data for new file");
compilator.compilation("/home/nikita/accviol.cpp","g++");
