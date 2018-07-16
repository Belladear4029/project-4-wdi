const Recommendation = require('../models/recommendation');
const City = require('../models/city');

function showRoute(req, res, next) {
  Recommendation
    .findById(req.params.id)
    .populate('city')
    .then(recommendation => res.json(recommendation))
    .catch(next);

}

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

function updateRoute(req, res, next) {
  Recommendation
    .findById(req.params.id)
    .then(recommendation => recommendation.set(req.body))
    .then(recommendation => recommendation.save())
    .then(recommendation => res.json(recommendation))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Recommendation
    .findById(req.params.id)
    .then(recommendation => recommendation.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
