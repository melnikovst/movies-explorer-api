const Movie = require("../models/movie");
const BadRequest = require("../errors/BadRequest");
const Forbidden = require("../errors/Forbidden");
const NotFound = require("../errors/NotFound");
const {
  BAD_REQUEST_VALIDATION_ERROR,
  NOT_FOUND_DELETING_CARD,
  FORBIDDEN_RESPONSE,
  BAD_REQUEST_CAST_ERROR,
} = require("../utils/constants");

module.exports.postCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const card = await Movie.create({
      ...req.body,
      owner,
    });
    res.send(card);
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log(error);
      return next(new BadRequest(BAD_REQUEST_VALIDATION_ERROR));
    }
    next(error);
  }
};

module.exports.getCards = async (req, res, next) => {
  try {
    const response = await Movie.find({ owner: req.user._id });
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Movie.findById(id);
    if (!response) {
      return next(new NotFound(NOT_FOUND_DELETING_CARD));
    }
    if (response.owner.toString() !== req.user._id) {
      return next(new Forbidden(FORBIDDEN_RESPONSE));
    }
    console.log(id);
    const deletedCard = await Movie.findByIdAndDelete(id);
    res.send({ message: `Удалили карточку ${deletedCard.nameRU}` });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new BadRequest(BAD_REQUEST_CAST_ERROR));
    }
    next(error);
  }
};
