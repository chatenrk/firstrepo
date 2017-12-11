var AuthController = require('./AuthController');
var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./UserController');
app.use('/users', UserController);

app.use('/api/auth', AuthController);
module.exports = app;