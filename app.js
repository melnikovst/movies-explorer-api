require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const parser = require('cookie-parser');
const { errors } = require('celebrate');
const { handleErrors } = require('./errors/error');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/movies');
const NotFound = require('./errors/NotFound');
const { WRONG_URL } = require('./utils/constants');
const limiter = require('./middlewares/limiter');

const { PORT, MONGO } = process.env;

const app = express();
mongoose.connect(MONGO);

app.use(bodyParser.json());
app.use(parser());
app.use(helmet());
app.use(errors());
app.use(userRouter);
app.use(cardRouter);
app.use(handleErrors);
app.use(limiter);

app.use('*', () => {
  throw new NotFound(WRONG_URL);
});

app.listen(PORT, () => {
  console.log(`Развернулося на порту ${PORT}`);
});