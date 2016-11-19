/**
 * Created by dzmitry_dubrovin on 13-Nov-16.
 */
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    name: String,
    key: String
});

var Project = mongoose.model('Project', schema);

module.exports = Project;