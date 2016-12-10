/**
 * Created by dzmitry_dubrovin on 08-Dec-16.
 */
var express = require('express');
var router = express.Router();
var User = require('../Model/User').User;
var HttpError = require('../error').HttpError;
var passport = require('../auth');

router.post('/login',
    passport.authenticate('local', {failureRedirect: '/#/login'}),
    function (req, res) {
        res.json({success: true});
    });

router.get('/secure',
    function (req, res, next) {
        next();
    },
    function (req, res, next) {
        res.json(req.session);
    });

router.post('/register', function (req, res, next) {
    var user = new User({login: req.body.login, password: req.body.password, name: req.body.name});
    user.save(function (err) {
        return err
            ? next(err)
            : res.json({success: true});
    });
});

router.get('logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;