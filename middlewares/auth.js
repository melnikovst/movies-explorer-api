const token = require('jsonwebtoken');

module.exports.auth = (req, _, next) => {
  console.log(req.cookies);
  const { jwt } = req.cookies;
  if (!jwt) {
    console.log('Необходима авторизация');
    return;
  }
  let payload;
  try {
    payload = token.verify(jwt, 'kurwa-rabotai');
  } catch (err) {
    console.log(err);
    return;
  }
  req.user = payload;
  next();
};
