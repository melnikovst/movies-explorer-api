const { Joi, celebrate } = require('celebrate');
const { REGEXP } = require('../utils/constants');

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
    name: Joi
      .string(),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    email: Joi
      .string()
      .required()
      .email(),
  }),
});

// CARDS

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    year: Joi
      .number()
      .required(),
    description: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
    image: Joi
      .string()
      .required()
      .pattern(REGEXP),
    trailerLink: Joi
      .string()
      .required()
      .pattern(REGEXP),
    thumbnail: Joi
      .string()
      .required()
      .pattern(REGEXP),
    movieId: Joi
      .number()
      .required(),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
  }),
});

module.exports.validateIds = celebrate({
  params: Joi.object().keys({
    id: Joi
      .string()
      .required()
      .hex()
      .length(24),
  }),
});
