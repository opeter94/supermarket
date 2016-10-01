var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();

var indexHtml = path.join(config.clientRoot, 'app', 'views', 'index.html');
router.get('/', function (req, res) {
    res.sendFile(indexHtml);
});

var page404 = path.join(config.clientRoot, 'app', 'pagenotfound', 'pagenotfound.html');
router.all('*', function(req, res) {
    res.sendFile(page404);
});

module.exports = router;
