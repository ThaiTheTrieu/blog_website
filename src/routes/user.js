const express = require('express');
const route = express.Router();
const UserController = require('../app/controllers/UserController');

route.get('/registe', UserController.showRegitePage);
route.post('/registe', UserController.register);
route.post('/validaUsername', UserController.userNameIsExist);

module.exports = route;