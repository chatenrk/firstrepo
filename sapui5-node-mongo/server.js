var express = require('express');
var Persons = require('./models/persons.js');
var app = express();

app.get('/',function(req,res){
	res.send("Please use appropriate route");

app.get('/persons',function(req,res){
	console.log('Inside get persons method');

	
// This is used to get the persons data from MongoDB	
	Persons.getPersons(function(err,data){
		if (err){throw err;}
		
		res.send(data);
	});
})	
	
	
});

app.listen(3000);
console.log("running on port 3000");