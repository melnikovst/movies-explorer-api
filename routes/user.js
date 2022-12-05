const userRouter = require('express').Router();

const { me, signout, updateUser } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/joi');

userRouter.get('/users/me', me);
userRouter.get('/signout', signout);
userRouter.patch('/users/me', validateUpdateProfile, updateUser);

module.exports = userRouter;
