//compilation

var exec = require("child_process").exec;
var fb = require('firebird');
var cfg = require("./dbconfig").cfg;
var conn = fb.createConnection();
var PATH = "/home/nikita/ProgrammingGolf/tests/";
var waitTime =0;
var outputFile="/home/nikita/ProgrammingGolf/tests/out";
function compilation(fileName, language_id) {
	var options;
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
			console.log("test");
		 	var r = res.fetchSync("all",false);
			var compilator=r.toString();
			console.log(compilator);
		//Если компилятор есть, то делаем имя исполняемого файла Main
			if (compilator!="")
			{
				waitTime = 500;
				console.log("I have compilator");
				execFileName=PATH+"Main";
			//читаем опции компилятора
				conn.query("select COMPILER_OPTIONS from PROGRAM_LANGUAGES where ID_PROGRAM_LANGUAGE="+language_id, 						function(err2,res2){
					if(err){ 
					     console.log("error2");
					     console.log(err2);
					     return;  
					}
				 	var r2 = res2.fetchSync("all",false);
					 options=r2.toString();
			// если опции есть, то запускаем компилятор с именем файла  и опциями
					if (options!="")
					{
						console.log("I have options");
						exec(compilator+" "+ fileName+" "+options+" "+execFileName+" 2>log");
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
			conn.query("select comand_to_exec from PROGRAM_LANGUAGES where ID_PROGRAM_LANGUAGE="+language_id, 					function(err3,res3){
				if(err){ 
					console.log("error3");
					console.log(err3);
					return;  
				}
			
				var r3 = res3.fetchSync("all",false);
				console.log(execFileName);
				var execCommand=r3.toString();
				console.log(execCommand+"qwe");
				//пришлось сделать задержку, так как (насколько я понимаю) исполняемый файл создается долго, и исполнение без 					//задержки происходит до того, как создаться исполняемый файл
				setTimeout(function() {
					console.log(execCommand+" "+execFileName+" >"+outputFile);
					exec(execCommand+" "+execFileName+" >"+outputFile);
				}, waitTime);				
				conn.disconnect();
			});	
				
		});
		
	});
}
compilation("/home/nikita/ProgrammingGolf/tests/test.js",7);
//exports.compilation=compilation;
