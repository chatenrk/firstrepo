var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');

var persSchema = mongoose.Schema({
	fname:String,
	lname:String
});

var persModel = mongoose.model('persons',persSchema);

module.exports.getPersons = function(callback){
	persModel.find(callback);
}