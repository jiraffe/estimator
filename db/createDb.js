var mongoose = require('../lib/mongoose');
var Estimation = require('../Model/Estimation');
var Project = require('../Model/Project');
var User = require('../Model/User');
var Role = require('../Model/Role');

mongoose.connection.on('open', function () {

    var db = mongoose.connection.db;
    db.dropDatabase(function (err) {
        if(err) throw err;
    })

});