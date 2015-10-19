//compilation

var exec = require("child_process").exec;

function compilation(fileName, compilator) {
	switch (compilator){
		case "g++":
			exec("g++ "+ fileName+" 2>log");
			break;
	}
	
}

exports.compilation=compilation;
