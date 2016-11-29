/**
 * Created by dzmitry_dubrovin on 13-Nov-16.
 */
var express = require('express');
var router = express.Router();
var Estimation = require('../Model/Estimation');
var Project = require('../Model/Project');

router.get("/", function (req, res, next) {

    Project.find({}, function (err, projects) {

        if(err) {
            res.status(500).send("Couldn't get projects! \r\n" + err);
        } else {
            res.json(projects);
        }
    });
});

router.get("/:key", function (req, res, next) {

    Project.find({key: req.params.key}, function (err, projects) {

        if(err) {
            res.status(500).send("Couldn't get projects! \r\n" + err);
        } else {
            res.json(projects);
        }
    });
});

router.get("/estimations/:key", function (req, res, next) {

    Estimation.find({projectKey: req.params.key}, function (err, estimations) {

        if(err) {
            res.status(500).send("Couldn't get estimations! \r\n" + err);
        } else {
            res.json(estimations);
        }
    });

});

router.post("/", function (req, res, next) {
    var project = new Project(req.body);

    Project.findOneAndUpdate({key: project.key}, project, {upsert: true}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({success: true});
        }
    });
});

router.delete("/:key", function (req, res, next) {
    Project.remove({key: req.params.key}, function (err) {
        if (err) {
            res.status(500).send("Couldn't delete project " + req.params.key + "! \r\n" + err);
        } else {
            res.status(200).json({success: true});
        }
    })
});

router.get('/:projectKey/estimation/:estimationKey', function (req, res, next) {
    Estimation.find({key: req.params.estimationKey, projectKey: req.params.projectKey}, function (err, estimation) {

        if(err) {
            res.status(500).send("Couldn't get estimation! \r\n" + err);
        } else {
            res.json(estimation);
        }
    });
});

router.post('/:projectKey/estimation/:estimationKey', function (req, res, next) {
    var estimation = new Estimation(req.body);

    if(estimation.id) {
        updateMeta(req, res, next, estimation);
    } else {
        updateEstimation(req, res, next, estimation);
    }
});

function updateMeta(req, res, next, estimation) {
    Estimation.findOneAndUpdate({_id: estimation.id}, estimation, {upsert: true}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({success: true});
        }
    });
}

function updateEstimation(req, res, next, estimation) {

    Estimation.findOneAndUpdate({key: estimation.key}, estimation, {upsert: true}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({success: true});
        }
    });
}

module.exports = router;