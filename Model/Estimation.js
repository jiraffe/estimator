var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    key: String,
    summary: String,
    estimationTime: Number,
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
                    estimation: [
                        {
                            name: String,
                            value: Number
                        }
                    ]
                }
            ]
        }
    ],

    stabilization: Number,
    coordination: Number
});


var Estimation = mongoose.model('Estimation', schema);

module.exports = Estimation;