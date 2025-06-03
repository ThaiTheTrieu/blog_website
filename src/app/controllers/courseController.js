const util = require('../../util/mongoose');
const Course = require('../models/Course');

class CourseController {

    getCourseDetail(req, res, next) {
        Course.findOne({ 'slug': req.params.slug }).then(course => {
            res.render('course/show', { course: util.mongoose2object(course) });
        }).catch(next);
    }

    createCourse(req, res) {
        res.render('course/create');
    }

    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.create(formData).then(() => res.redirect('/me/stored/course')).catch(next);
    }

    edit(req, res, next) {
        const _id = req.params._id;
        Course.findById(_id).then(Course => {
            res.render('course/update', { Course: util.mongoose2object(Course) });
        }).catch(next);
    }

    update(req, res, next) {
        const _id = req.params._id;
        const data = req.body;
        data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.findByIdAndUpdate(_id, data).then(() => {
            res.redirect('/me/stored/course');
        }).catch(next);
    }

    softDelete(req, res, next) {
        const _id = req.params._id;
        Course.softDelete({ _id: _id }).then(() => {
            res.redirect('back');
        }).catch(next);
    }

    delete(req, res, next) {
        const _id = req.params._id;
        Course.deleteOne({ _id: _id }).then(() => {
            // res.redirect('/me/recycle');
            res.json({message: "Xóa thành công!"});
        }).catch(next);
    }

    restore(req, res, next) {
        console.log("Route nhận request:", req.originalUrl);
        const _id = req.params._id;
        // Course.restore({_id: _id}).then(()=>{
        //     res.redirect('back');
        // }).catch(next);
        Course.restore({ _id: _id })
            .then(() => res.json({ message: "Khôi phục thành công!" })) // Trả về JSON thay vì redirect
            .catch(next);
    }

    deleteMany(req, res, next){
        const ids = req.body.ids;
        console.log("Route nhận request:", req.originalUrl);
        if (!ids || ids.length===0)  
            return res.json({success: false, message: "không có khóa học được chọn"})
        Course.sDeleteMany(ids).then(()=>{
            res.json({success: true, message: "Đã xóa thành công!"});
        }).catch(next);
    }
}

module.exports = new CourseController();