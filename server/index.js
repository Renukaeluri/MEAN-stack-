var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var methodoverride = require('method-override');
var _ = require('lodash');

//creating application 

var app = express();

//add middleware where necessary for rest API's

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(methodoverride('X-HTTP-Method-Override'));

//CORS support

app.use(function(req, res, next){
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.header('Access-Control-Allow-Headers', 'Content-Type');
 next();
});

app.use('/hello', function(req, res, next){
res.send('hello world');
next();

});

//connect to mongo DB
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open' , function(){

	 //load the modules 
app.models = require('./models/index.js');


//load the routes. 
var routes = require('./routes');
_.each(routes, function(controller, route){
	app.use(route, controller(app,route));

});


console.log("Listen 3000");
app.listen(3000);

});

