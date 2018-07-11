const router = require('express').Router();
const cities = require('../controllers/cities');
const recommendations = require('../controllers/recommendations');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.get('/cities', cities.index);
router.get('/cities/:id', cities.show);

router.post('/recommendations', secureRoute, recommendations.create);

router.get('/users', users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
