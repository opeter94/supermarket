'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();

var homePage = path.join(config.clientRoot, 'app', 'views', 'index.html');
router.get('/', function (req, res) {
    res.sendFile(homePage);
});

module.exports = router;
