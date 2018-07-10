const City = require('../models/city');

function showRoute(req, res, next){
  City
    .findById(req.params.id)
    .then(city => res.json(city))
    .catch(next);
}

module.exports = {
  show: showRoute
};
