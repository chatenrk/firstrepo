var mongoose     = require('mongoose');
var Schema       = mongoose.Scema;
 
var UserSchema   = mongoose.Schema({
    email: String,
    password: String,
    token: String
});
 
module.exports = mongoose.model('User', UserSchema);