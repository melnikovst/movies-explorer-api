const userRouter = require('express').Router();

const { auth } = require('../middlewares/auth');
const {
  postProfile, me, login, signout, updateUser,
} = require('../controllers/users');
const { validateAuth, validateUpdateProfile } = require('../middlewares/joi');

userRouter.post('/signup', validateAuth, postProfile);
userRouter.post('/signin', validateAuth, login);
userRouter.use(auth);
userRouter.get('/users/me', me);
userRouter.get('/signout', signout);
userRouter.patch('/users/me', validateUpdateProfile, updateUser);

module.exports = userRouter;
