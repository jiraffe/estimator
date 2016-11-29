/**
 * Created by dzmitry_dubrovin on 13-Nov-16.
 */
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    name: String,
    key: String,
    estimationModel: {
        fields:[Stirng],
        estimationTimeNeeded: Boolean,
        coordination: {
            isNeeded: Boolean,
            percentage: Number
        },
        stabilisation: {
            isNeeded: Boolean,
            percentage: Number
        },
        testing: {
            isNeeded: Boolean,
            percentage: Number
        },
        other: {
            isNeeded: Boolean,
            percentage: Number
        }
    }
});

var Project = mongoose.model('Project', schema);

module.exports = Project;