const cardRouter = require('express').Router();
const { postCard, getCards, deleteCard } = require('../controllers/movies');
const { validateCard, validateIds } = require('../middlewares/joi');

cardRouter.get('/movies', getCards);
cardRouter.post('/movies', validateCard, postCard);
cardRouter.delete('/movies/:id', validateIds, deleteCard);

module.exports = cardRouter;
