var mongoose = require('mongoose');
 
var mfschemeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    scode: Number,
    sname: String
});
 
var MfSchemeModel = mongoose.model('schemes', mfschemeSchema);
 
module.exports = MfSchemeModel;