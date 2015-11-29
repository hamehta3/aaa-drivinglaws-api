// app/routes/states.js

var State = require('../models/state');

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /states/:state_name
  router.route('/:state_name')
  .get(function(req, res, next) {
    // Return state
    State.find({ state: req.params.state_name }, function(err, state) {
        if (err) {
          res.send(err);
        }
        res.json(state);
    });
  });

  router.route('/')
  .get(function(req, res, next) {
    // Logic for GET /states routes
    State.find(function(err, states) {
        if (err) {
          res.send(err);
        }
        res.json(states);
    });
  });
};
