'use strict';

var models = require('../models/models');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.userName);
});

passport.deserializeUser(function (userName, done) {
    models.User.findOne({where: {userName: userName}})
        .then(function (user) {
            done(null, user);
        })
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        models.User.findOne({where: {userName: username, password: password}})
            .then(function (user) {
                if (!user) {
                    return done(null, false, {message: 'Incorrect username/password.'});
                }
                return done(null, user);
            });
    }
));

passport.userOnly = function(req, res, next) {
    if (!req.user) {
        res.sendStatus(401);
    } else {
        next();
    }
};

passport.adminOnly = function(req, res, next) {
    if (!req.user) {
        res.sendStatus(401);
    } else if (!req.user.isAdmin) {
        res.sendStatus(403);
    } else {
        next();
    }
};

module.exports = passport;

