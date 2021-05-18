const SchoolModel = require('../db/models/school');

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
module.exports = School;
