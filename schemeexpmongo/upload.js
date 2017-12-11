var csv = require('fast-csv');
var mongoose = require('mongoose');
var mfschemesModel = require('./scheme.js')
 
exports.post = function (req, res) {
	debugger;
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var mfschemeFile = req.files.file;
 
    var mfschemes = [];
         
    csv
     .fromString(mfschemeFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         mfschemes.push(data);
     })
     .on("end", function(){
    	 if(mfschemes.length===0){return res.status(400).send('No Data found to upload');}
    	 mfschemesModel.create(mfschemes, function(err, documents) {
            if (err) throw err;
         });
          
         res.send(mfschemes.length + ' Mutual Fund Schemes have been successfully uploaded.');
     });
    
    
    
    
};


exports.getScheme = function(callback){
	mfschemesModel.find(callback);
}