var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var HttpError = require('./error').HttpError;

var mongoose = require('./lib/mongoose');

var app = express();

app.use(express.static(path.join(__dirname, 'views')));

app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// auth setup
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore(
    {
        uri: 'mongodb://localhost/estimator',
        collection: 'sessions'
    });
// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

var sessionOpts = {
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOpts));

// view engine setup

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    next();
});

var passport = require('./auth');

app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/index');
var estimations = require('./routes/estimations');
var projects = require('./routes/projects');
var users = require('./routes/users');


app.use('/', routes);
app.use('/estimations', estimations);
app.use('/projects', projects);
app.use('/users', users);





module.exports = app;
