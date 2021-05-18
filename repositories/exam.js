
const ExamModel = require('../db/models/exam');
const ProblemModel = require('../db/models/problem');
const problem = require('../services/problem');
const Exam = {};

Exam.CreateExam = async (data) => {
    var exam = await ExamModel.create(data);
    return exam;
}
Exam.EditExam = async (examID, data) => {
    var exam = await ExamModel.findOne({_id: examID});
    if  (data.examTime === undefined) {    
        exam.examTime = undefined
    }
    exam.save();
    exam = await ExamModel.updateOne({_id: examID}, 
        data
    );
    exam = await ExamModel.findOne({_id: examID});
    return exam;
}
Exam.GetExam = async (examID) => {
    var exam = await ExamModel.findOne({_id: examID});
    return exam;
}
Exam.HandlePublishExam = async (examID) => {
    var exam = await ExamModel.findOne({_id: examID});
    exam.isPublished = (!exam.isPublished);
    exam.save();
    return exam;
}
Exam.GetAllExam = async (userID) => {
    var listExam = await ExamModel.find({isCreatedBy: userID});
    return listExam;
}
Exam.DeleteExam = async (examID) => {
    await ExamModel.deleteOne({_id: examID});
    return true;
}
Exam.GetFullExam = async () => {
    var listExam = await ExamModel.find({});
    return listExam;
}
Exam.AddProblem = async (examID, problemID) => {
    var exam = await ExamModel.findOne({_id: examID});
    exam.listProblemIsCreated.push(problemID);
    exam.save();
    return exam;
}
Exam.GetAllProblemOfExam = async (examID) => {
    var listProblem = await ProblemModel.find({examID: examID});
    
    return listProblem;
}
Exam.SelectProblem = async (problemID) => {
    var problem = await ProblemModel.findOne({_id: problemID});
    problem.isSelected = true;
    problem.save();
    return problem;
}
Exam.UnSelectProblem = async (problemID) => {
    var problem = await ProblemModel.findOne({_id: problemID});
    problem.isSelected = false;
    problem.save();
    return problem;
}


module.exports = Exam;
