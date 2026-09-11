const { Router } = require('express');
const { body } = require('express-validator');
const gamesController = require('../controllers/gamesController');

const gamesRouter = Router();

const validateGame = [
    body('title').trim()
        .notEmpty().withMessage('Title is required.')
        .isLength({ max: 100 }).withMessage('Title must be 100 characters or fewer.'),

    body('description').trim()
        .optional({ values: 'falsy' })
        .isLength({ max: 250 }).withMessage('Description must be 250 characters or fewer.'),

    body('price')
        .notEmpty().withMessage('Price is required.')
        .isFloat({ min: 0 }).withMessage('Price must be a number greater than or equal to 0.'),

    body('rating')
        .optional({ values: 'falsy' })
        .isFloat({ min: 0, max: 10 }).withMessage('Rating must be a number between 0 and 10.'),
];

gamesRouter.get('/', gamesController.getGames);

gamesRouter.get('/new', gamesController.showCreateGameForm);
gamesRouter.post('/new', validateGame, gamesController.createGame);

gamesRouter.get('/:id/edit', gamesController.showUpdateGameForm);
gamesRouter.post('/:id/edit', validateGame, gamesController.updateGame);

gamesRouter.post('/:id/delete', gamesController.deleteGame);

gamesRouter.get('/:id', gamesController.getGame);

module.exports = gamesRouter;