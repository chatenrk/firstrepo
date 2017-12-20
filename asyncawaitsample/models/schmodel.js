var mongoose = require('mongoose');

var mfschemeSchema = mongoose.Schema({

    scode: Number,
    sname: String
});
 
var mfschemesModel = mongoose.model('schemes', mfschemeSchema);

module.exports = mfschemesModel;