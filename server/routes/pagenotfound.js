'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();

var indexPage = path.join(config.clientRoot, 'index.html');
router.all('*', function(req, res) {
    res.sendFile(indexPage);
});

module.exports = router;
