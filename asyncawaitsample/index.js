var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var asyncfe = require('async-foreach');

var mfschemesModel = require('./models/schmodel.js')
var helpers = require('./helpers/helpers.js')
var schroutes = require('./routes/schroutes.js')


app.get('/',function(req,res,next){
res.send("async await example");
});


// Connect to Mongodb using Mongoose
mongoose.connect('mongodb://localhost/test',{useMongoClient: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



///* GET schemes */

app.get('/schemes', async (req, res) => 
{
	try
	{
		schemes = await schroutes.findAll();
		res.send(schemes);
	}
	catch(err)
	{
		 return res.status(500).send(err);
	}
});



/* POST scheme */
app.post('/scheme', async (req, res) => 
{
	var mfscheme = {
			scode:req.body.scode,
			sname:req.body.sname
	};
	
	try
	{
		
		debugger;
		var parseResult = await schroutes.postOne(mfscheme);
		res.send(parseResult);
	}
	catch(err)
	{
		debuger;
		return res.status(500).send(err);
	}
});	
	
	

/* POST schemes */
app.post('/schemes', async (req, res) => 
{
	try
	{
	
		debugger;
		var result = await schroutes.postMany();
		res.send(result);
	}
	catch(err)
	{
		debugger;
		return res.status(500).send(err);
	}
});



	



app.listen(3000);
console.log("Listening on port 3000");