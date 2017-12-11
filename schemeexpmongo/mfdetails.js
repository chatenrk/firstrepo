var mongoose = require('mongoose');
 
var mfdetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    scode: {
    	type:Number,
    	
    },
    dnav:{
    	type: Date,
    	
    },
    amc:String,
    fname: String,
    nav: {
    	type:Number,
    	
    	
    }
});
 
var MfDetModel = mongoose.model('mfdetl', mfdetSchema);
 
module.exports = MfDetModel;