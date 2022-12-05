const route = require('express').Router();

const user = require('./user');
const movies = require('./movies');
const { auth } = require('../middlewares/auth');
const { validateAuth } = require('../middlewares/joi');
const { postProfile, login } = require('../controllers/users');

route.post('/signup', validateAuth, postProfile);
route.post('/signin', validateAuth, login);
route.use(auth);
route.use(user);
route.use(movies);

module.exports = route;
