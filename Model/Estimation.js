var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    key: String,
    summary: String,
    estimationTime: Number,
    projectKey: String,
    status: String, // NEW, InProgress, Questions, Done, Sent, Approved
    sections: [
        {
            number: Number,
            name:String,
            subSections: [
                {
                    subNum : Number,
                    descr : String,
                    estimation: {
                            DB: Number,
                            Java: Number,
                            UI: Number
                        }
                }
            ]
        }
    ],

    stabilization: Number,
    coordination: Number
});


var Estimation = mongoose.model('Estimation', schema);

module.exports = Estimation;