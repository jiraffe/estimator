/**
 * Created by dzmitry_dubrovin on 13-Nov-16.
 */
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    name: String,
    key: String,
    itsLink: String,
    estimationModel: {
        fields: [String],
        estimationTimeNeeded: Boolean,
        mngmntModel: [
            {
                name: String,
                percent: Number
            }
        ]
    }
});

var Project = mongoose.model('Project', schema);

module.exports = Project;