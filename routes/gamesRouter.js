const { Router } = require('express');
const gamesController = require('../controllers/gamesController');

const gamesRouter = Router();

gamesRouter.get('/', gamesController.getGames);

gamesRouter.get('/new', gamesController.showCreateGameForm);
gamesRouter.post('/new', gamesController.createGame);

gamesRouter.get('/:id/edit', gamesController.showUpdateGameForm);
gamesRouter.post('/:id/edit', gamesController.updateGame);

gamesRouter.post('/:id/delete',  gamesController.deleteGame);

gamesRouter.get('/:id', gamesController.getGame);

module.exports = gamesRouter;