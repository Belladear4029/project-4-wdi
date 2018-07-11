const Recommendation = require('../models/recommendation');
const City = require('../models/city');

function createRoute(req, res, next) {
  req.body.creator = req.currentUser;

  City.findOne({ name: req.body.city.name })
    .then(city => {
      if(city) return city;
      return City.create(req.body.city);
    })
    .then(city => {
      req.body.city = city;

      Recommendation
        .create(req.body)
        .then(recommendation => res.status(201).json(recommendation))
        .catch(next);
    });

}

module.exports = {
  create: createRoute
};
