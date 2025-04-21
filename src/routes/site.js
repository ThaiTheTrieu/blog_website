const express = require('express');
const route = express.Router();
const siteController = require('../app/controllers/siteController');
const UserController = require('../app/controllers/UserController');

route.get('/', siteController.show);
route.get('/login', UserController.showLoginPage);
route.post('/login', UserController.login);
route.put('/logout', UserController.logout);

module.exports = route;