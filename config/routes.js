const router = require('express').Router();
const cities = require('../controllers/cities');
const auth = require('../controllers/auth');
const users = require('../controllers/users');

router.get('/cities', cities.index);
router.get('/cities/:id', cities.show);

router.get('/users', users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
