'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');

var registerAppRoot = path.join(config.clientRoot, 'app', 'register');
var registerPage = path.join(registerAppRoot, 'register.html');

router.post('/createUser', function (req, res) {
    console.log(req.body.user.userName);
    console.log(req.body.user.password);
    console.log(req.body.user.cityId);
    console.log(req.body.user.address);
    console.log(req.body.user.firstName);
    console.log(req.body.user.lastName);
    console.log(req.body.user.email);
    res.sendFile(registerPage);
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
