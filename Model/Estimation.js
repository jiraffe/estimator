var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    key: String,
    summary: String,

    itsLink: String,

    comments: [{
        text: String
    }],

    estimationModel: {
        fields: [String],
        estimationTimeNeeded: Boolean,
        mngmntModel: [
            {
                name: String,
                percent: Number
            }
        ]
    },

    analysis: {
        subSections: [
            {
                descr : String,
                estimation: Number
            }
        ]
    },

    estimationTime: Number,
    developmentTime: Number,
    totalTime: Number,
    component:String,
    version: String,

    approvedDate: Date,
    workStartDate: Date,
    workEndDate: Date,

    projectKey: String,
    status: {
        name: String,
        value: String,
        style: String
    },
    sections: [
        {
            number: String,
            name:String,
            subSections: [
                {
                    subNum : String,
                    descr : String,
                    estimation:[Number]
                }
            ]
        }
    ]
}, { minimize: false });


var Estimation = mongoose.model('Estimation', schema);

module.exports = Estimation;