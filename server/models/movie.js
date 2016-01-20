var mongoose = require('mongoose');

//create the movie schema 
var movieSchema = new mongoose.Schema({

title: {
	type: String,
	required: true
},

url: {
	 type: String,
	 required: true
}
});

 //Exports the model schema

module.exports = movieSchema;