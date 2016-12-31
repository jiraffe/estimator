/**
 * Created by dzmitry_dubrovin on 29-Dec-16.
 */
var express = require('express');
var router = express.Router();
var EstimationModel = require('../Model/EstimationModel').EstimationModel;
var preparedModel = require('../Model/EstimationModel').preparedModel;
var async = require('async');

var fields = [];
(function () {
    EstimationModel.find({}, function (err, flds) {
        fields = flds;
    });
})();

router.get('/', function (req, res, next) {
    res.json(fields);
});

router.get('/reinit', function (req, res, next) {
    async.series([
            function (cb) {
                EstimationModel.remove({}, cb)
            },
            function (cb) {

                async.mapSeries(
                    preparedModel,
                    (el, next) => new EstimationModel(el).save((err) => {err && console.log(err); next();}),
                    (err) => cb()
                )
            }
        ],
        function (err, results) {
            res.json({success: true});
        });

});

module.exports = router;