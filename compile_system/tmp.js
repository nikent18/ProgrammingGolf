var mysql      = require('mysql');
//var config = require('config');

var connection = mysql.createConnection({
	host:     'localhost',
	user:     'golf',
	password: 'golf',
	database: 'golf_programming'
});

connection.connect(function(err)
{
 if (err) {
   console.error('MySQL error connecting: ' + err.stack);
   return;
 }

 console.log('MySQL connected as id ' + connection.threadId);
});

var getAllTasks = function(cb) {
  connection.query("SELECT * FROM tasks", function(err, rows, fields)
  {
    console.log('Rows ', rows);
    cb(rows, err);
  });
};

var getProgramLangs = function(argument) {
  return [{'lang': 'c++'}, {'lang': 'Java'}, {'lang': 'Python'}, {'lang': 'bash'}];
};

var getTestByTaskID = function(taskID)
{
  // TODO: create sql table TESTS
  return [ {'in': '1 2', 'out': '3'}, {'in': '2 3', 'out': '5'}];
};

var getTask = function(id, cb) {
  connection.query("SELECT * FROM tasks WHERE id = ?", id, function(err, rows, fields)
  {
    rows[0]['tests'] = getTestByTaskID(id);
    rows[0].authorName = rows[0].author;
    cb(rows[0], err);
  });
};

var getProgText= function(id,cb){
	cb('abc');
	return 'abc';
}

var getExt = function(id,cb){
	cb('.c');
	return '.c';
}

var getPathToCompiler= function(id,cb){
	cb('gcc');
	return 'gcc';
}

var getExecCommand= function(id,cb){
	cb('./');
	return './';
}

var getOptions= function(id,cb){
	cb('-o');
	return '-o';
}
exports.getProgramLangs = getProgramLangs;
exports.getAllTasks = getAllTasks;
exports.getTask = getTask;
exports.getTestByTaskID = getTestByTaskID;

exports.getProgText= getProgText;
exports.getExt=getExt;
exports.getPathToCompiler=getPathToCompiler;
exports.getExecCommand=getExecCommand;
exports.getOptions=getOptions;
