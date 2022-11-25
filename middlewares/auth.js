const token = require('jsonwebtoken');
const { WRONG_ACCESS } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, _, next) => {
  console.log(req.cookies);
  const { jwt } = req.cookies;
  if (!jwt) {
    console.log(WRONG_ACCESS);
    return;
  }
  let payload;
  try {
    payload = token.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'rabotai');
  } catch (err) {
    console.log(err);
    return;
  }
  req.user = payload;
  next();
};
