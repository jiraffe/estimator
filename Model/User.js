/**
 * Created by dzmitry_dubrovin on 15-Nov-16.
 */
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    login: String,
    password: String
});

var User = mongoose.model('User', schema);

module.exports = User;