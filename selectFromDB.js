var fb = require('firebird');
var cfg = require("./dbconfig").cfg;
var conn = fb.createConnection();
function queryRes(request) {
	conn.connect(cfg.db, cfg.user, cfg.password, cfg.role,function(err){
		if(!err) {
		    console.log("Database is connected ... \n\n");  
		} else {
		    console.log("Error connecting database ... \n\n");  
		   }
	});	
	conn.query(request, function(err,res){
		 	if(err){ 
		     		console.log("error");
		     		console.log(err);
		     		return;  
		 	}
		 	var r = res.fetchSync("all",false);
		 	console.log( r.toString() );
		 	return r.toString();
		});
};
exports.queryRes = queryRes;
