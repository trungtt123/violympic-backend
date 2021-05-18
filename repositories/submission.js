
const SubmissionModel = require('../db/models/submission');
const Submission = {};

Submission.CreateSubmission = async (data) => {
    var submisstion = await SubmissionModel.create(data);
    return submisstion;
}
Submission.GetSubmissionOfUser = async(userID, problemID) => {
    console.log(userID, problemID);
    var listSubmission = await SubmissionModel.find({userID, problemID});
    listSubmission.sort((a, b) => {
        return a.updateAt < b.updateAt
    });
    return listSubmission;
}


module.exports = Submission;
