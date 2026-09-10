const {Router} = require('express');
const developersController = require('../controllers/developersController');

const developersRouter = Router();

developersRouter.get('/', developersController.getDevelopers);

developersRouter.get('/new', developersController.showCreateDeveloperForm);
developersRouter.post('/new', developersController.createDeveloper);

developersRouter.get('/:id/edit', developersController.showUpdateDeveloperForm);
developersRouter.post('/:id/edit', developersController.updateDeveloper);

developersRouter.post('/:id/delete', developersController.deleteDeveloper);

developersRouter.get('/:id', developersController.getDeveloper);

module.exports = developersRouter;