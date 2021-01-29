const express = require('express');

const usuarioController = require('./controllers/usuarioController');
const chamadoController = require('./controllers/chamadoController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();    
routes.post('/session',sessionController.create);

routes.get('/users', usuarioController.index);
routes.post('/users', usuarioController.create);
routes.post('/orders', chamadoController.create);
routes.get('/orders', chamadoController.index);
routes.delete('/orders/:id', chamadoController.delete);
routes.get('/profile',profileController.index);

module.exports = routes;