'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();

var registerAppRoot = path.join(config.clientRoot, 'app', 'register');

var registerPage = path.join(registerAppRoot, 'register.html');

router.post('/register', function (req, res) {
    console.log(req.body.user.userName);
    console.log(req.body.user.password);
    res.sendFile(registerPage);
});

module.exports = router;
