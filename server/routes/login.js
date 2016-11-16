'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');

var loginAppRoot = path.join(config.clientRoot, 'app', 'login');

var loginPage = path.join(loginAppRoot, 'login.html');

router.post('/login', function (req, res) {
    console.log(req.body.user.userName);
    console.log(req.body.user.password.toString());
    res.sendFile(loginPage);
});

module.exports = router;
