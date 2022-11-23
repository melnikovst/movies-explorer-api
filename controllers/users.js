const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.postProfile = async (req, res) => {
  console.log(req.body);
  const {
    email, password,
  } = req.body;
  try {
    const hashedPassword = await crypt.hash(password, 5);
    const response = await User.create({
      email, password: hashedPassword,
    });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.send('Неправильный адрес электронной почты или неверный пароль');
      return;
    }
    const matched = await crypt.compare(password, user.password);
    if (!matched) {
      res.send('Неправильные почта или пароль');
      return;
    }
    const key = jwt.sign({ _id: user._id }, 'kurwa-rabotai', {
      expiresIn: '7d',
    });
    console.log(key);
    res.cookie('jwt', key, {
      sameSite: 'None',
      /*       secure: true, */
      maxAge: 7777777,
    /*       httpOnly: true, */
    }).send({ message: 'Залогинились успешно)' });
    console.log('Я ВЫПОЛНИЛСЯ');
  } catch (error) {
    console.log(error);
  }
};

module.exports.me = async (req, res) => {
  console.log(req.user);
  try {
    const me = await User.findById(req.user._id);
    res.send(me);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
