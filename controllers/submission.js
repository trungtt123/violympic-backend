const SubmissionServices = require('../services/submission');
module.exports = (app) => {
    app.get('/submission/getsubmission/:userID/:problemID', (req, res) => {
        SubmissionServices.GetSubmissionOfUser(req, res);
    });
};