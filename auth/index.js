/**
 * Created by dzmitry_dubrovin on 08-Dec-16.
 */
var passport = require('passport');
// var yandexStrategy = require('passport-yandex').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('./../Model/User').User;

passport.serializeUser(function (user, done) {
    done(null, user.login);
});

passport.deserializeUser(function (login, done) {
    User.findOne({login: login}, function (err, user) {
        err ?
            done(err, null) :
            done(null, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true,
        session: true
    },
    function (req, login, password, done) {

        User.findOne({login: login}).select('+hashedPassword +salt').populate('_role').exec(function (err, user) {
            if (err) {
                done(err);
            } else if (!user) {
                done(null, false, {message: 'Incorrect username.'});
            } else if (!user.checkPassword(password)) {
                done(null, false, {message: 'Incorrect password.'});
            } else {
                done(null, user);
            }
        })
    }
));

module.exports = passport;

module.exports.mustAuthenticated = function (req, res, next) {
    req.isAuthenticated()
        ? next()
        : res.status(401).json({auth: false});
};