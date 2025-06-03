const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const softDelete = require('../../util/plugin/softDelete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    // _id: { type: Number, },
    name: { type: String },
    videoId: { type: String, },
    description: { type: String, maxlegth: 255 },
    image: { type: String, default: "" },
    slug: { type: String, slug: 'name', unique: true },
// }, { id_: false, versionKey: false, timestamps: true });
}, { versionKey: false, timestamps: true });

function autoFilterDeleted(next) {
    this.where({ deleteAt: null }); // Chỉ lấy tài liệu chưa bị xóa
    next();
}

// Áp dụng middleware cho `find`, `findOne`, `findById`, `aggregate`
// Course.pre(/^find/, autoFilterDeleted);
// Course.pre('aggregate', function (next) {
//     this.pipeline().unshift({ $match: { deleteAt: null } });
//     next();
// });

//custom query helpers
CourseSchema.query.sortabel = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);

        return this.sort({ [req.query.column]: isValidtype ? req.query.type : 'desc', });
    }
    return this;
}

CourseSchema.plugin(softDelete);

module.exports = mongoose.model('Course', CourseSchema);

