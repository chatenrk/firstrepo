var express = require('express');
var app = express();
var port = '3000';

app.get('/',function(req,res){
	res.send('This is a sample program')
		});

app.get('/sample',function(req,res){
	res.send('This is in /sample page')
});

app.listen(port);
console.log('Listening on port 3000');