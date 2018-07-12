const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });

      res.json({
        user,
        token,
        message: `Welcome back ${user.username}`
      });

    })

    .catch(next);
}

function currentUser(req, res, next) {
  User
    .populate(req.currentUser, { path: 'recommendations' })
    .then(user => res.json(user))
    .catch(next);
}

function updateCurrentUser(req, res, next) {
  User
    .findById(req.currentUser)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  register,
  login,
  currentUser,
  updateCurrentUser
};
