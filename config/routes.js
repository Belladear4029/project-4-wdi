const router = require('express').Router();
const cities = require('../controllers/cities');
const auth = require('../controllers/auth');
const users = require('../controllers/users');

router.get('/cities/:id', cities.show);

router.get('/users', users.index);
router.get('/users/:id', users.show);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
