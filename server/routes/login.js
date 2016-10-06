'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();

var loginAppRoot = path.join(config.clientRoot, 'app', 'login');

var loginPage = path.join(loginAppRoot, 'login.html');
router.get('/login', function (req, res) {
    res.sendFile(loginPage);
});

router.post('/login', function (req, res) {
    console.log(req.body.user.userName);
    console.log(req.body.user.password);
    res.sendFile(loginPage);
});

module.exports = router;
