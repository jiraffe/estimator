/**
 * Created by dzmitry_dubrovin on 09-Nov-16.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:server'));

module.exports = mongoose;