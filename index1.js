var codeFile = require("./createFile");
var async = require('async')
//var compilator =require("./compilation");
var selection = require("./selectFromDB");

var fb = require('firebird');
var cfg = require("./dbconfig").cfg;
var conn = fb.createConnection();

var newFile=new Object();


function readSolution(id) {

	//первый запрос к бд
	newFile.ex=selection.queryRes("select ex_original_file from program_languages where id_program_language=(select program_language from 							solutions where id_solution="+id+")");
	
	//второй запрос к бд
	newFile.data=selection.queryRes("select text from solutions where id_solution="+id);
	
	//теперь хочу использовать результаты этих запоросов...
}
readSolution(3);
//compilator.compilation("/home/nikita/accviol.cpp","g++");
