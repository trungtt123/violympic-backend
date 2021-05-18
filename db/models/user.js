const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    passWord: {
        type: String,
        required: true,
        trim: true
    },
    token:{
        type: String,
        required: true,
        trim: true
    },
    infomation: {
        fullName: {
            type: String,
            trim: true
        },
        provinceID: {
            type: String,
            trim: true
        },
        districtID: {
            type: String,
            trim: true
        },
        schoolID: {
            type: String,
            trim: true
        },
        permissionID: {
            type: Number,
            required: true
        }
    }

}, {collection: 'user'}
);

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;