const express = require('express');
const route = express.Router();
const meController = require('../app/controllers/MeController');
// const sortMidleware = require('../app/midleware/sortMidleware');

// route.use(sortMidleware);

route.get('/stored/course', meController.storedCourse);
route.get('/recycle', meController.showRecycle);


module.exports = route;