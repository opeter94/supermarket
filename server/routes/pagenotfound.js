'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();

var pageNotFoundPage = path.join(config.clientRoot, 'app', 'pagenotfound', 'pagenotfound.html');
router.all('*', function(req, res) {
    res.sendFile(pageNotFoundPage);
});

module.exports = router;
