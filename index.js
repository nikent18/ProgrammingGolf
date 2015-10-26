var codeFile = require("./createFile");
var compilator =require("./compilation");


var fb = require('firebird');
var cfg = require("./dbconfig").cfg;
var conn = fb.createConnection();

var newFile=new Object();
//	newFile.data="sdf";
function readSolution(id) {
//читаю с базы данных код-решения
	conn.connect(cfg.db, cfg.user, cfg.password, cfg.role, function(){
		console.log("Connected to database");
		conn.query("select text from solutions where id_solution="+id, function(err,res){
		if(err){ 
		     console.log("error");
		     console.log(err);
		     return;  
		}
         	var r = res.fetchSync("all",false);
	 	newFile.data=r.toString();
  //читаю расширение файла		
		conn.query("select ex_original_file from program_languages where id_program_language=(select program_language from solutions where 					id_solution="+id+")", function(err,res){
		 	if(err){ 
		     		console.log("error");
		     		console.log(err);
		     		return;  
		 	}
		 	var r = res.fetchSync("all",false);
		 	console.log( r.toString() );
		 	newFile.ex=r.toString();
		 	conn.disconnect();
			//создаю файл		
			codeFile.createFile("file1",newFile.ex,newFile.data);
	     		});	
		});
	});
}
readSolution(1);
//compilator.compilation("/home/nikita/accviol.cpp","g++");
