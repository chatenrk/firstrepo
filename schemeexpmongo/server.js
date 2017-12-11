var express = require('express');
var fileUpload = require('express-fileupload');
app = express();
var server = require('http').Server(app);
var template = require('./template.js');
var upload = require('./upload.js');
var mongoose = require('mongoose');


app.use(fileUpload());

// Ensure we have CORS issue sorted 
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


server.listen(3000);

// Get the initial index file, which will be used for file upload
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Route for template retrieval
app.get('/template', template.get);
console.log('Listening on port 3000')

// Connect to Mongodb using Mongoose
mongoose.connect('mongodb://localhost/test');

// Upload Data to Mongo DB
app.post('/', upload.post);

//Get Details posted to MongoDB
app.get('/schdetls',function(req,res){

	upload.getScheme(function(err,data){
		if(err){throw err;}
		res.send(data);
	});
	
});