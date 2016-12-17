/**
 * Created by dzmitry_dubrovin on 16-Dec-16.
 */
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Role;

var schema = new Schema({
    name: String,
    label: String,
    accessLevel: Number,
    users: [{ type: ObjectId, ref: 'User' }]
});

Role = mongoose.model('Role', schema);

module.exports = Role;