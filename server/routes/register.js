'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');
var passport = require('../config/passport');

var registerAppRoot = path.join(config.clientRoot, 'app', 'register');
var registerPage = path.join(registerAppRoot, 'register.html');

router.post('/createUser', function (req, res, next) {
    models.User.findOrCreate({where: {userName: req.body.user.userName}, defaults: req.body.user})
        .spread(function (user, created) {
            if (!created) {
                res.statusCode = 409;
            } else {
                // has to put user data directly on body to make passport work
                req.body.username = req.body.user.userName;
                req.body.password = req.body.user.password;
                passport.authenticate('local', function (err, user, info) {
                        req.logIn(user, function (err) {
                            if (err) {
                                return next(err);
                            }
                        });
                    }
                )(req, res, next);
            }
            res.sendFile(registerPage);
        })
    ;
});

router.post('/createCity', function (req, res) {
    models.City.findOrCreate({where: req.body.city})
        .spread(function (city, created) {
            if (!created) {
                res.statusCode = 409;
            }
            res.sendFile(registerPage);
        })
});

router.get('/getCities', function (req, res) {
    models.City.findAll()
        .then(function (cities) {
            res.status(200).json(cities);
        })
});

module.exports = router;
