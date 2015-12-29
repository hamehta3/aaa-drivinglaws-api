var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();

module.exports = function(app) {
  'use strict';
  
  // Initialize all routes
  Object.keys(routes).forEach(function(routeName) {
    var router = express.Router();
    
    // Enable CORS
    router.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
    // Initialize the route to add its functionality to router
    require('./' + routeName)(router);
    
    // Add router to the speficied route name in the app
    app.use('/' + changeCase.paramCase(routeName), router);
  }); 
};
