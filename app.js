require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const parser = require('cookie-parser');
const { errors } = require('celebrate');
const { handleErrors } = require('./errors/error');
const route = require('./routes');
const NotFound = require('./errors/NotFound');
const { WRONG_URL } = require('./utils/constants');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const { PORT = 3001, MONGO = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();
mongoose.connect(MONGO);

app.use(bodyParser.json());
app.use(parser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(route);

app.use('*', () => {
  console.log('я умер');
  throw new NotFound(WRONG_URL);
});
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Развернулося на порту ${PORT}`);
});
