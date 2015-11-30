// config/initializers/database.js

var config = require('nconf');
var mongoose = require('mongoose');

module.exports = function(cb) {
  'use strict';
  // Initialize the component here then call the callback
  mongoose.connect(process.env.MONGO_DB_URL || config.get('MONGO_DB_URL')); // connect to our database
  // Return the call back
  cb();
};
