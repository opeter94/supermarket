'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');

var registerAppRoot = path.join(config.clientRoot, 'app', 'register');

var registerPage = path.join(registerAppRoot, 'register.html');

router.post('/register', function (req, res) {
    console.log(req.body.user.userName);
    console.log(req.body.user.password);
    res.sendFile(registerPage);
});

router.get('/city/getCities', function (req, res) {
    models.City.findAll()
        .then(function (cities) {
            res.status(200).json(cities);
        })
});

module.exports = router;
