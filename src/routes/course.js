const courseController = require('../app/controllers/courseController');
const express = require('express');

const authMidleware = require('../app/midleware/loginMidleware');

const route = express.Router();

route.get('/create', authMidleware ,courseController.createCourse);
route.post('/store', courseController.store);
route.delete('/multi-delete', courseController.deleteMany);
route.delete('/recycle/:_id', courseController.delete);
route.put('/recycle/:_id', courseController.restore);
route.delete('/:_id', courseController.softDelete);
route.get('/:_id/edit', courseController.edit);
route.put('/:_id', courseController.update);
route.get('/:slug', courseController.getCourseDetail);

module.exports = route;