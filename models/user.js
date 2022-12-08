const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      unique: true,
      required: 'Введённый адресс электронной почты не может быть пустым', /* строка true */
      type: String,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Введён невалидный адрес электронной почты.',
      },
    },
  },
  { toObject: { useProjection: true }, toJSON: { useProjection: true } },
);

module.exports = mongoose.model('user', userSchema);
