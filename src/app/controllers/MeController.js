const course = require('../models/Course')
const util = require('../../util/mongoose');

class MeController {

    storedCourse(req, res, next) {
        let courseQuery = course.findNotDel();

        // if (req.query.hasOwnProperty('_sort')){
        //     const isValidtype = ['asc', 'desc'].includes(req.query.type);
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: isValidtype? req.query.type : 'descx    ',
        //     });
        // }
            
        Promise.all([course.countDeleted(), courseQuery.sortabel(req)])
            .then(([deletedCount, Courses]) => {
                res.render('me/stored-course', { Courses: util.multipleMongoose2Object(Courses), deletedNum: deletedCount });
            }).catch(next);
        // course.findNotDel().then(Courses =>{
        //     res.render('me/stored-course', {Courses: util.multipleMongoose2Object(Courses),deletedNum: deletedCont});
        // }).catch(next);
    }

    showRecycle(req, res, next) {
        course.findDeleted({}).then(course => {
            res.render('me/recycle', { course: util.multipleMongoose2Object(course) });
        }).catch(next);
    }

    // ShowUpdateForm(req, res, next){
    //     course.findOne({slug: req.params.slug}).then(course =>{
    //         res.render('course/update', {Course: util.mongoose2object(course)});
    //     }).catch(next);
    // }

    // update(req, res, next){
    //     const formData = req.body;
    //     // res.json(formData);
    //     course.updateOne({slug: req.params.slug}, formData).then(course => {
    //         console.log("update sucess!");
    //         res.redirect('/me/stored/course');
    //     }).catch(next);
    // }


}

module.exports = new MeController();