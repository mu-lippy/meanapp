var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// create the application
var app = express();

// add middleware needed for REST APIs
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
// CORS Support
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



// connect to MongoDB
mongoose.connect('mongodb://localhost/mean-app');
mongoose.connection.once('open', function() {
    console.log('I\'m listening on port 3000...');
    app.listen(3000);
});

// load the models - lets you dep. inject models into the controllers
app.models = require('./models/index');

// load the routes
var routes = require('./routes');

_.each(routes, function(controller, route) {
    
    app.use(route, controller(app, route));
});