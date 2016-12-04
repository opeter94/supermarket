'use strict';

var express = require("express");
var app = express();
var pageNotFoundRouter = require('./routes/pagenotfound');
var registerRouter = require('./routes/register');
var adminRouter = require('./routes/admin');
var profileRouter = require('./routes/profile');
var authRouter = require('./routes/auth');
var homeRouter = require('./routes/home');
var config = require('./config/config');
var logger = require('./libs/logger/logger');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var models = require('./models/models');
var session = require('express-session');
var passport = require('./config/passport');

// log info about every request, this must be done before any other middleware service(used as first middleware)
app.use(logger.logRequests);

// set express static content root to 'client' directory
app.use(express.static(config.clientRoot));

// expose the html body data on req.body, parse as json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// configuring session
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: null,
        secure: false
    },
    resave: false,
    saveUninitialized: true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// apply defined routes from routes folder
app.use(registerRouter);
app.use(adminRouter);
app.use(profileRouter);
app.use(authRouter);
app.use(homeRouter);
// pageNotFound must be the last one
app.use(pageNotFoundRouter);

models.sequelize.sync().then(function () {
    app.listen(3000, function () {
        console.log('Web server started.');
        console.log('Listening on port 3000.')
    })
});
