/**
 * Created by dzmitry_dubrovin on 09-Dec-16.
 */
var express = require('express')
    , router = express.Router()
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;

// var app = express();


var mongoose = require('./lib/mongoose');
var Estimation = require('./Model/Estimation');


console.log(Estimation.schema.paths);



var users = [
    {
        id: 1,
        login: 'test',
        password: 'pass'
    },
    {
        id: 2,
        login: 'test2',
        password: 'pass2'
    } 
];

// passport setup
passport.serializeUser(function (user, done) {
    console.log("serialization", user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    users.forEach(function (user) {
        if (user.id === id) done(null, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'pass',
        passReqToCallback: true,
        session: false
    },
    function (req, login, password, done) {
        console.log('strategy');

        var target = {id: 333};

        users.forEach(function (user) {
            if(user.login === login && user.password === password) {
                target = user;
            }
        });

        console.log(target);

        done(null, target);
    }
));


// express setup

// var session = require('express-session');
// var sessionOpts = {secret: 'keyboard cat', resave: true, saveUninitialized: true};
//
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(session(sessionOpts));
// // Initialize Passport!  Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());

// var router = express.Router();
// router.post('/login',
//     passport.authenticate('local', {failureRedirect: '/login'}),
//     function (req, res) {
//         res.json({success: true});
//     });
// app.use('/', router);

// app.listen(3000, function () {
//     console.log('server running');
// });