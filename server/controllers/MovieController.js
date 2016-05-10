var restful = require('node-restful');

module.exports = function(app, route) {
    
    // set up the controller for REST
    var rest = restful.model(
        'movie',
        app.models.movie
    ).methods(['get','put','post','delete']);
    
    // register this endpoint with the application
    rest.register(app, route);
    
    // return middleware - allows custom functionality to be returned on a per-controller basis
    return function (req, res, next) {
        next();
    };
};