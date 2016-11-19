var express = require('express');
var router = express.Router();
var Estimation = require('../Model/Estimation');
var mongoose = require('../lib/mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {

    Estimation.find({}, function (err, estimations) {

        if(err) {
            res.status(500).send("Couldn't get estimations! \r\n" + err);
        } else {
            res.json(estimations);
        }
    });
});

router.get('/statuses', function (req, res, next) {

   res.json([
       {
           name: 'NEW',
           value: 'новая',
           style: 'default'
       },
       {
           name: 'InProgress',
           value: 'В работе',
           style: 'primary'
       },
       {
           name: 'Questions',
           value: 'Есть вопросы',
           style: 'warning'
       },
       {
           name: 'Done',
           value: 'Готова',
           style: 'info'
       },
       {
           name: 'Sent',
           value: 'Выслана',
           style: 'danger'
       },
       {
           name: 'Approved',
           value: 'Согласована',
           style: 'success'
       }
   ]);
});

router.get('/:key', function (req, res, next) {

    Estimation.findOne({key: req.params.key}, function (err, est) {

        if(err) {
            res.status(500).send("Couldn't get estimations! \r\n" + err);
        } else {
            res.json(est);
        }

    });
});

router.post("/", function (req, res, next) {

    var estimation = new Estimation(req.body);

    Estimation.findOneAndUpdate({key: estimation.key}, estimation, {upsert:true}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({success: true});
        }
    });
});

router.delete('/:key', function (req, res, next) {

    Estimation.remove({key: req.params.key}, function (err) {
        if(err) {
            res.status(500).send("Couldn't delete estimation " + req.params.key + "! \r\n" + err);
        } else {
            res.status(200).send();
        }
    });

});

module.exports = router;
