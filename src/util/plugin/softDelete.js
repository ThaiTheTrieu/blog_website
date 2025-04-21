module.exports = function softDeletePlugin(Schema) {
    Schema.add({
        deleteAt: { type: Date, default: null },
        deleted: { type: Boolean, default: false }
    })

    // Schema.pre(/^find/, function (next) {
    //     this.where({ deleteAt: null });
    //     next();
    // })

    // Schema.pre('aggregate', function (next) {
    //     this.pipline().unshift({ $match: { deleted: true } });
    //     next();
    // })
    Schema.statics.findNotDel = function () {
        return this.find({ deleted: { $ne: true } });
    }

    Schema.statics.softDelete = function (id) {
        return this.findByIdAndUpdate(id, { deleteAt: new Date(), deleted: true });
    }

    Schema.statics.restore = function (id) {
        return this.findByIdAndUpdate(id, { deleted: false });
    }

    Schema.statics.findWithDeleted = function (filter = {}) {
        return this.find(filter);
    };

    // Static method: Lấy danh sách tài liệu đã bị xóa mềm
    Schema.statics.findDeleted = function () {
        return this.find({ deleted: { $ne: false } });
    };

    Schema.statics.countDeleted = function(){
        return this.countDocuments({deleted: {$ne: false}})
    }

    Schema.statics.sDeleteMany = function(ids){
        return this.updateMany({_id: {$in: ids}}, {deleted: true, deleteAt: new Date()});
    }
};