const course = require('../models/Course');
const util = require('../../util/mongoose');

class siteController {
    show(req, res, next) {
        course.findNotDel().then(courses => {
            res.render('Home', { courses: util.multipleMongoose2Object(courses) });
        }).catch(next);
    }
}

module.exports = new siteController();