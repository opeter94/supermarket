'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');
var passport = require('../config/passport');

var loginAppRoot = path.join(config.clientRoot, 'app', 'login');
var loginPage = path.join(loginAppRoot, 'login.html');

router.post('/login', function (req, res, next) {
    // has to put user data directly on body to make passport work
    req.body.username = req.body.user.userName;
    req.body.password = req.body.user.password;
    passport.authenticate('local', function (err, user, info) {
        if (user === false) {
            res.sendStatus(401);
        } else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
            });
            user.password = null;
            res.status(200).json(user);
        }
    })(req, res, next);
});

router.get('/initialLoginCheck', function (req, res) {
    if (req.user) {
        res.status(200).json(req.user.isAdmin);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;