require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const parser = require('cookie-parser');
const { errors } = require('celebrate');
const { postProfile, me, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/filmsdb');

app.use(bodyParser.json());
app.use(parser());
app.use(errors());
app.post('/signup', postProfile);
app.post('/signin', login);
app.use(auth);
app.get('/users/me', me);

app.listen(PORT, () => {
  console.log(`Развернулося на порту ${PORT}`);
});
