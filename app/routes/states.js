// app/routes/states.js

var logger = require('winston');

var State = require('../models/state');

module.exports = function(router) {
  'use strict';
  // GET /states/:state_name
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

  // GET /states/:state_name/laws
  router.route('/:state_name/laws')
  .get(function(req, res, next) {
    var cursor = State.aggregate([ { $match: { "state": req.params.state_name } } ]).project({ laws: "$categories.laws" }).unwind("laws").unwind("laws").group({ _id: "laws", "laws": { $addToSet: "$laws" } }).project({ _id: 0, "laws": 1 }).cursor({ batchSize: 1 }).exec();
    cursor.next(function(err, state) {
      if (err) {
          res.send(err);
        }
        res.json(state);
    });
  });

  // GET /states/:state_name/categories
  router.route('/:state_name/categories')
  .get(function(req, res, next) {
    var cursor = State.aggregate([ { $match: { "state": req.params.state_name } } ]).project({ categories: "$categories.category" }).unwind("categories").group({ _id: "categories", "categories": { $addToSet: "$categories" } }).project({ _id: 0, "categories": 1 }).cursor({ batchSize: 1 }).exec();
    cursor.next(function(err, state) {
      if (err) {
          res.send(err);
        }
        res.json(state);
    });
  });

  // GET /states/:state_name/categories/:category_name
  router.route('/:state_name/categories/:category_name')
  .get(function(req, res, next) {
    var cursor = State.aggregate([ { $match: { "state": req.params.state_name } } ]).unwind("categories").match({ "categories.category": req.params.category_name }).project({ _id: 0, "categories": 1 }).cursor({ batchSize: 1 }).exec();
    cursor.next(function(err, state) {
      if (err) {
          res.send(err);
        }
        res.json(state);
    });
  });

  // GET /states/:state_name/categories/:category_name/laws/:law_name
  router.route('/:state_name/categories/:category_name/laws/:law_name')
  .get(function(req, res, next) {
    var cursor = State.aggregate([ { $match: { "state": req.params.state_name } } ]).unwind("categories").match({ "categories.category": req.params.category_name }).unwind("categories.laws").match({ "categories.laws.name": req.params.law_name }).project({ _id: 0, "categories": 1 }).cursor({ batchSize: 1 }).exec();
    cursor.next(function(err, state) {
      if (err) {
          res.send(err);
        }
        res.json(state);
    });
  });

  router.route('/')
  .get(function(req, res, next) {
    // GET /states
    var cursor = State.aggregate().project({ _id: 0, states: "$state" }).sort('states').group({ _id: "states", "states": { $push: "$states" } }).project({ _id: 0, states: "$states" }).cursor({ batchSize: 1 }).exec();
    cursor.next(function(err, states) {
      if (err) {
          res.send(err);
        }
        res.json(states);
    });
  });
};
