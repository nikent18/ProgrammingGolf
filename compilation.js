//compilation

var exec = require("child_process").exec;
var fb = require('firebird');
var cfg = require("./dbconfig").cfg;
var conn = fb.createConnection();

function compilation(fileName, language_id) {
	var execFileName =fileName;
	//подключаемся к бд
	conn.connect(cfg.db, cfg.user, cfg.password, cfg.role, function(){
		console.log("Connected to database");
		//читаем компилятор из БД
		conn.query("select path from PROGRAM_LANGUAGES where ID_PROGRAM_LANGUAGE="+language_id, function(err,res){
			if(err){ 
			     console.log("error");
			     console.log(err);
			     return;  
			}
		 	var r = res.fetchSync("all",false);
			var compilator=r.toString();
		//Если компилятор есть, то делаем имя исполняемого файла Main
			if (compilator!="")
			{
				execFileName="Main";
			//читаем опции компилятора
				console.log(compilator);
				conn.query("select COMPILER_OPTIONS from PROGRAM_LANGUAGES where ID_PROGRAM_LANGUAGE="+language_id, 						function(err2,res2){
					if(err){ 
					     console.log("error2");
					     console.log(err2);
					     return;  
					}
				 	var r2 = res2.fetchSync("all",false);
					var options=r2.toString();
			// если опции есть, то запускаем компилятор с именем файла  и опциями
					if (options!="")
					{
						exec(compilator+" "+ fileName+options+" Main"+" 2>log");
						console.log(options);
						
					} 
			//опций нет, значит просто компилим
					else 
					{
						exec(compilator+" "+fileName);
					}
				});
			}
			//доделать БД и проверить
			//читаем из БД команду для запуска программы и запускаем её
			conn.query("select execCommand from PROGRAM_LANGUAGES where ID_PROGRAM_LANGUAGE="+language_id, 					function(err3,res3){
				if(err){ 
					console.log("error3");
					console.log(err3);
					return;  
				}
				var r3 = res3.fetchSync("all",false);
				var execCommand=r3.toString();
				exec(execCommand+" "+execFileName);				
				
			});	
				
		});
	});
}
compilation("/home/nikita/sysprog/accviol.cpp",4);
//exports.compilation=compilation;
