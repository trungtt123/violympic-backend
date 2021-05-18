const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ExamSchema = new Schema({
    examName: {
        type: String,
    },
    examCode:{
        type: String
    },
    examTime:  {
        type: Object,
        default: undefined
    },
    isCreatedBy: {
        type: String // save username
    },
    listProblemIsCreated: {
        type: Array,
        default: []
    },
    isPublished: {
        type: Boolean,
        default: false
    }

}, { collection: 'exam' }
);
const ExamModel = mongoose.model('exam', ExamSchema);

module.exports = ExamModel;