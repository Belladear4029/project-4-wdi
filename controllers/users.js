const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
