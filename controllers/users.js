const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate({
      path: 'recommendations',
      populate: {
        path: 'creator city'
      }
    })
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function followRoute(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      user.following.push(req.params.id);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function unfollowRoute(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      user.following.splice(req.params.id);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  follow: followRoute,
  unfollow: unfollowRoute
};
