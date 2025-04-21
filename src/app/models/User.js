const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// const schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    hashPassword: { type: String, required: true },
    // role: {
    //     type: String,
    //     enum: ['admin', 'customer', 'employee'],
    //     required: true, default: 'customer'
    // },
}, { versionKey: false, timestamps: true });

UserSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.hashPassword)
};

module.exports = mongoose.model('User', UserSchema);