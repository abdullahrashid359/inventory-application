const { Router } = require('express');
const { body } = require('express-validator');
const genresController = require('../controllers/genresController');

const genresRouter = Router();

const validateGenre = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Genre name is required.')
        .isLength({ max: 100 })
        .withMessage('Genre name must be 100 characters or fewer.'),
];

genresRouter.get('/', genresController.getGenres);

genresRouter.get('/new', genresController.showCreateGenreForm);
genresRouter.post('/new', validateGenre, genresController.createGenre);

genresRouter.get('/:id/edit', genresController.showUpdateGenreForm);
genresRouter.post('/:id/edit', validateGenre, genresController.updateGenre);

genresRouter.post('/:id/delete', genresController.deleteGenre);

genresRouter.get('/:id', genresController.getGenre);

module.exports = genresRouter;