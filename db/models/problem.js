const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ProblemSchema = new Schema({
    problemName: {
        type: String,
    },
    problemTags: {
        type: String,
    },
    problemNumberOfSolved: {
        type: Number,
        default: 0
    },
    problemTestCase: {
        type: Array
    },
    problemMemoryLimit: {
        type: String
    },
    problemContent: {
        type: String,
        default: ""
    },
    examID: {
        type: String
    },
    isSelected: {
        type: Boolean,
        default: false
    }
}, { collection: 'problem' }
);

const ProblemModel = mongoose.model('problem', ProblemSchema);

module.exports = ProblemModel;