var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var asyncfe = require('async-foreach');

var mfschemesModel = require('./models/schmodel.js')

app.get('/',function(req,res,next){
res.send("async await example");
});


// Connect to Mongodb using Mongoose
mongoose.connect('mongodb://localhost/test',{useMongoClient: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



/* GET schemes */
app.get('/schemes', async (req, res) => {
  try{
      let schemes 	    
      schemes = await mfschemesModel.find();
	debugger;	
      res.send(schemes);
  } catch (err) {
	debugger;
    return res.status(500).send(err);
  }
});

/* POST schemes */
app.post('/scheme', async (req, res) => {
 
try{
      let schemes 
      var _id = new mongoose.Types.ObjectId();	
	debugger;    
      schemes = await mfschemesModel.create({scode:req.body.scode,sname:req.body.sname});
	debugger;	
      res.send(schemes);
  } catch (err) {
	debugger;
    return res.status(500).send(err);
  }	
});


/* POST schemes */
app.post('/schemes', async (req, res) => {

	var mfschemes = 
    	  [{
    			"scode": "102956",
    			"sname": "Axis Banking & PSU Debt Fund - Bonus Option"
    		},
    		{
    			"scode": "105427",
    			"sname": "Axis Banking & PSU Debt Fund - Daily Dividend Option"
    		}
    	]

      
  try
  {
	  var resArray = await inserttoDB(mfschemes)
	  debugger;
      res.send(resArray);  
  }

  catch(err)
  {
	  res.send(err);
  }    
      
    
  
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) 
  { 
	 await callback(array[index], index, array)
  }
}
async function inserttoDB(mfschemes) 
{
	
	var resdone = {};
	var resArray= [];
	let schemes;
	
	await asyncForEach(mfschemes,async (item,index,array) => 
    {
  	  try
  	  {	
  		  
  		  schemes = await mfschemesModel.create({scode:mfschemes[index].scode,sname:mfschemes[index].sname});
  		  debugger;
  		  resdone.scode = schemes.scode;
  		  resdone.sname = schemes.sname;
  		  resdone.success = true;
  		  resdone.message = "Inserted Successfully";
  		  resArray.push(resdone);
  		  resdone ={};
  	  }
  	  catch(err)
  	  {
  		  debugger;
  		  resdone.scode = mfschemes[index].scode;
  		  resdone.sname = mfschemes[index].sname;
  		  resdone.success = false;
  		  resdone.errcode = err.code;
  		  resdone.message = err.message;
  		  resArray.push(resdone);
  		  resdone ={};
  	  }
  	  
  	  
});
	debugger;
	return resArray;
}	
	



app.listen(3000);
console.log("Listening on port 3000");