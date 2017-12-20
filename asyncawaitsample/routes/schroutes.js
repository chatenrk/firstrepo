// All routes for the scheme data to be inserted here
var mfschemesModel = require('../models/schmodel.js')
var helpers = require('../helpers/helpers.js')
var mongoose = require('mongoose');

// This route gets all the documents inside the schemes collection in MongoDB
async function findAll()
{
try{
      let schemes 	    
      schemes = await mfschemesModel.find();
      return schemes;
  } catch (err) 
  {
    return err;
  }
}


// This route posts a single scheme to database
async function postOne(mfscheme)
{
	
	
	try
	{
		let schemes 
		var _id = new mongoose.Types.ObjectId();	
		schemes = await mfschemesModel.create({scode:mfscheme.scode,sname:mfscheme.sname});
		var parseResult = helpers.parseOutput(errflag,schemes);
		
	} 
	catch (err) 
	{	
		
		var operation = err.getOperation();
		var errflag = true;
		var parseResult = helpers.parseOutput(errflag,err,operation);
//		return err;
	}	
	return parseResult;
}

// This function posts multiple records to the database and sends the errors accordingly
async function postMany()
{
	debugger
	var mfschemes = 
	  [{
			"scode": "103456",
			"sname": "Axis Banking & PSU Debt Fund - Bonus Option"
		},
		{
			"scode": "100427",
			"sname": "Axis Banking & PSU Debt Fund - Daily Dividend Option"
		}
	]


	try
	{
		var resArray = await helpers.inserttoDB(mfschemes)
		debugger;
		return resArray;  
	}

	catch(err)
	{	
		debugger;
		return err;
	}    
}

// Ensure all the above methods are avaialable for other JS methods
module.exports ={
		findAll: findAll,
		postOne:postOne,
		postMany:postMany
}