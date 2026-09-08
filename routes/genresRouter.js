const { Router } = require('express');
const genresController = require('../controllers/genresController');

const genresRouter = Router();

genresRouter.get('/', genresController.getGenres);

genresRouter.get('/new', genresController.showCreateGenreForm);
genresRouter.post('/new', genresController.createGenre);

genresRouter.get('/:id/edit', genresController.showUpdateGenreForm);
genresRouter.post('/:id/edit', genresController.updateGenre);

genresRouter.post('/:id/delete',  genresController.deleteGenre);

genresRouter.get('/:id', genresController.getGenre);

module.exports = genresRouter;