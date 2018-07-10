const City = require('../models/city');

function indexRoute(req, res, next){
  City
    .find()
    .then(cities => res.json(cities))
    .catch(next);
}

function showRoute(req, res, next){
  City
    .findById(req.params.id)
    .populate('recommendations.creator')
    .then(city => res.json(city))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
