const Recommendation = require('../models/recommendation');

function createRoute(req, res, next) {
  req.body.creator = req.currentUser;
  Recommendation
    .create(req.body)
    .then(recommendation => res.status(201).json(recommendation))
    .catch(next);
}

module.exports = {
  create: createRoute
};
