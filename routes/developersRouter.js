const { Router } = require('express');
const { body } = require('express-validator');
const developersController = require('../controllers/developersController');

const developersRouter = Router();

const validateDeveloper = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Developer name is required.')
        .isLength({ max: 100 })
        .withMessage('Developer name must be 100 characters or fewer.'),
];

developersRouter.get('/', developersController.getDevelopers);

developersRouter.get('/new', developersController.showCreateDeveloperForm);
developersRouter.post('/new', validateDeveloper, developersController.createDeveloper);

developersRouter.get('/:id/edit', developersController.showUpdateDeveloperForm);
developersRouter.post('/:id/edit', validateDeveloper, developersController.updateDeveloper);

developersRouter.post('/:id/delete', developersController.deleteDeveloper);

developersRouter.get('/:id', developersController.getDeveloper);

module.exports = developersRouter;