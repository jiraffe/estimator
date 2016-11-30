/**
 * Created by dzmitry_dubrovin on 13-Nov-16.
 */
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    name: String,
    key: String,
    estimationModel: {
        fields:[String],
        estimationTimeNeeded: Boolean,
        coordination: {
            isNeeded: Boolean,
            value: Number
        },
        stabilisation: {
            isNeeded: Boolean,
            value: Number
        },
        testing: {
            isNeeded: Boolean,
            value: Number
        },
        other: {
            isNeeded: Boolean,
            value: Number
        }
    }
});

var Project = mongoose.model('Project', schema);

module.exports = Project;