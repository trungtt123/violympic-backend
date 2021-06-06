const UserModel = require('../db/models/user');
const SchoolModel = require('../db/models/school');
const ExamResult = require('./examresult');

const School = {};

School.GetAllSchool = async(districtID) => {
    console.log(districtID);
    var listSchool = await SchoolModel.find({DistrictID: districtID});
    return listSchool;
}
School.GetSchoolFromID = async(schoolID) => {
    var school = await SchoolModel.findById(schoolID);
    return school;
}
School.GetAllUserOfTheSchool = async(schoolID) => {
    console.log("******************GetAllUserOfScholl******************");
    var users = await UserModel.find({});
    var dataExport = [];
    for (var i = 0; i < users.length; i++){
        console.log(users[i]);
        if (users[i].userName === 'admin') continue;
        const listResult = await ExamResult.GetListResult(users[i]._id);
        if (users[i].infomation.schoolID !== schoolID) continue;
        var user = {
            userID: users[i]._id,
            fullName: users[i].infomation.fullName,
            thcs: (users[i].infomation.examLevel !== 2) ? users[i].currentExam.thcs - 1 : '-',
            thpt: (users[i].infomation.examLevel !== 1) ? users[i].currentExam.thpt - 1: '-',
            totalResultTHCS: {
                score: listResult.totalResultTHCS.score.split('/')[0],
                time: listResult.totalResultTHCS.time
            },
            totalResultTHPT: {
                score: listResult.totalResultTHPT.score.split('/')[0],
                time: listResult.totalResultTHPT.time
            }
        }
        dataExport.push(user);
    }
    
    return dataExport;
}
module.exports = School;
