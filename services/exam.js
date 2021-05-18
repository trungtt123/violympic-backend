const User = require('../repositories/user');
const Exam = require('../repositories/exam');
const Problem = require('../repositories/problem');

module.exports = {
    async CreateExam(req, res) {
        try {
            var exam = await Exam.CreateExam(req.body);
            res.status(200).json({ success: true, result: exam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetExam(req, res) {
        try {
            var exam = await Exam.GetExam(req.params.examID);
            res.status(200).json({ success: true, result: exam });

        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async HandlePublishExam(req, res) {
        try {
            var exam = await Exam.HandlePublishExam(req.params.examID);
            res.status(200).json({ success: true, result: exam });

        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetExamForExaminer(req, res) {
        try {
            var exam = await Exam.GetExam(req.params.examID);
            var listProblem = await Exam.GetAllProblemOfExam(req.params.examID);
            var data = {
                examInfomation: exam,
                listProblem
            }
            res.status(200).json({ success: true, result: data });

        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async AddProblem(req, res) {
        try {
            var exam = await Exam.AddProblem(req.params.examID, req.params.problemID);
            res.status(200).json({ success: true, result: exam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetAllExam(req, res) {
        try {
            var exams = await Exam.GetAllExam(req.params.userID);
            res.status(200).json({ success: true, result: exams });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async EditExam(req, res) {
        try {
            var exam = await Exam.EditExam(req.params.examID, req.body);
            res.status(200).json({ success: true, result: exam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetAllProblemOfExam(req, res) {
        try {
            var listProblem = await Exam.GetAllProblemOfExam(req.params.examID);
            res.status(200).json({ success: true, result: listProblem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async SelectProblem(req, res) {
        try {
            var problem = await Exam.SelectProblem(req.params.problemID);
            res.status(200).json({ success: true, result: problem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async UnSelectProblem(req, res) {
        try {
            var problem = await Exam.UnSelectProblem(req.params.problemID);
            res.status(200).json({ success: true, result: problem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async DeleteExam(req, res) {
        try {
            var result = await Exam.DeleteExam(req.params.examID);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetFullExam(req, res) {
        try {
            var listExam = await Exam.GetFullExam();
            var listExamTmp = [];
            for (var i = 0; i < listExam.length; i++) {
                if (listExam[i].isPublished === true) {
                    var user = await User.GetInfomation(listExam[i].isCreatedBy);
                    var objTmp = {
                        listProblemIsCreated: listExam[i].listProblemIsCreated,
                        _id: listExam[i]._id,
                        examName: listExam[i].examName,
                        examCode: listExam[i].examCode,
                        examTime: listExam[i].examTime,
                        isCreatedBy: listExam[i].isCreatedBy,
                        userInfomation: user.infomation,
                    };
                    listExamTmp.push(objTmp);
                }
            }
            console.log(listExamTmp);
            res.status(200).json({ success: true, result: listExamTmp });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }
}