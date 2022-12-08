const token = require('jsonwebtoken');
const { WRONG_ACCESS } = require('../utils/constants');
const Unathorized = require('../errors/Unathorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, _, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new Unathorized(WRONG_ACCESS));
  }
  let payload;
  try {
    payload = token.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'rabotai');
  } catch (err) {
    return next(new Unathorized(WRONG_ACCESS));
  }
  req.user = payload;
  next();
};
