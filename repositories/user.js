const UserModel = require('../db/models/user');
var hash = require('object-hash');
const User = {};
User.GetInfomation = async (userID) => {
    var user = await UserModel.findOne({_id: userID});
    return user;
}
User.CheckExistUserFromUserName = async (userName) => {
    var user = await UserModel.findOne({ userName: userName });
    if (userName === null || userName === undefined) return true;
    return false;
}
User.Login = async (data) => {
    var passWord = hash(data.passWord, { algorithm: 'md5', encoding: 'base64' });
    var user = await UserModel.findOne({ userName: data.userName, passWord: passWord });
    if (user === null || user === undefined) return null;
    var userDataExport = {
        token: user.token,
        userName: user.userName,
        userID: user._id,
        infomation: user.infomation
    }
    return userDataExport;
}
User.CheckPassWord = async (data) => {
    var oldPassWord = hash(data.oldPassWord, { algorithm: 'md5', encoding: 'base64' });
    var user = await UserModel.findOne({ token: data.token });
    if (user === null || user === undefined) return false;
    if (user.passWord !== oldPassWord) return false;
    else return true;
}
User.ChangePassWord = async (data) => {
    var newPassWord = hash(data.newPassWord, { algorithm: 'md5', encoding: 'base64' });
    var user = await UserModel.findOne({ token: data.token });
    console.log(user);
    var newToken = hash(user.userName + data.newPassWord, { algorithm: 'md5', encoding: 'base64' });
    await UserModel.updateOne({ token: data.token },
        {
            passWord: newPassWord,
            token: newToken
        },
    );
    user = await UserModel.findOne({ token: newToken });
    return user;
}
User.CreateUser = async (data) => {
    var token = hash(data.userName + data.passWord, { algorithm: 'md5', encoding: 'base64' });
    var passWord = hash(data.passWord, { algorithm: 'md5', encoding: 'base64' });
    var userData = {
        userName: data.userName,
        passWord: passWord,
        token: token,
        infomation: data.infomation
    }
    var userDataExport = {
        token: token,
        infomation: data.infomation
    }
    await UserModel.create(userData);
    return userDataExport;
}
User.ChangeInfomation = async (data) => {
    console.log(data.token);
    await UserModel.updateOne({ token: data.token },
        { infomation: data.infomation }
    );

    var user = UserModel.findOne({ token: data.token });
    console.log(user);
    return user;
}
module.exports = User;
