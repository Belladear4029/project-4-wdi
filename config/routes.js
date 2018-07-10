const router = require('express').Router();
const cities = require('../controllers/cities');
const auth = require('../controllers/auth');




router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;