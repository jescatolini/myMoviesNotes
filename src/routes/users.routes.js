const { Router } = require('express');

const usersRoutes = Router();

const UsersController = require('../controllers/UsersController');
const usersController = new UsersController();

usersRoutes.get('/', usersController.index);
usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id', usersController.update);

module.exports = usersRoutes;