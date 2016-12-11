/**
 * Created by dzmitry_dubrovin on 08-Dec-16.
 */
var express = require('express');
var router = express.Router();
var User = require('../Model/User').User;
var HttpError = require('../error').HttpError;
var passport = require('../auth');
var path = require('path');
var fs = require('fs');

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({success: false});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({success: true});
        });
    })(req, res, next);
});

router.get('/password/reset', function (req, res, next) {
    User.findOne({email: req.query.email}, function (err, user) {
        if (err) {
            res.status(500).json({success: false, error: true});
        } else if (!user) {
            res.status(500).json({success: false, notFound: true});
        } else {
            var newPass = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 7; i++)
                newPass += possible.charAt(Math.floor(Math.random() * possible.length));

            user.password = newPass;
            user.save(function (err) {
                if (err) {
                    res.status(500).json({success: false, error: err});
                } else {
                    res.json({newPass: newPass});
                }
            });
        }

    });
});

router.post('/register', function (req, res, next) {
    var user = new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email
    });
    var fp = path.join(__dirname, '../', 'public/users/',user.login,'/');
    fs.mkdir(fp);

    saveUserAndResponse(user, res);
});

function saveUserAndResponse(user, res) {
    user.save(function (err) {
        return err
            ?
            err.errors ?
                res.status(500).json({success: false, errors: err.errors})
                :
                res.status(500).json({success: false, errors: err.toJSON()})
            :
            res.json({success: true});
    });
}

router.post('/profile/update', passport.mustAuthenticated, function (req, res, next) {

    User.findOne({login: req.session.passport.user}, function (err, user) {
        if(err) res.send(err);

        user.name = req.body.name;
        if(req.body.password) {
            user.password = req.body.password;
        }

        saveUserAndResponse(user, res);
    });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.json({success: true});
});

router.get('/profile', passport.mustAuthenticated, function (req, res, next) {
    User.findOne({login: req.session.passport.user}, function (err, user) {
        if(!user.avatarName) user.avatarName = "../../images/blank_account.png";
        res.json(user);
    });
});

router.post('/changeAvatar', passport.mustAuthenticated, function (req, res, next) {

    User.findOne({login: req.session.passport.user}, function (err, user) {

        if (!req.files) {
            res.json({success: false});
            return;
        }

        var file = req.files.file;
        var fp = path.join(__dirname, '../', 'public/users/',user.login,'/');
        file.mv(fp + file.name, function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                user.avatarName = file.name;
                user.save();
                res.json({success: true});
            }
        });
    });
});

module.exports = router;