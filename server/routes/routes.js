var express = require('express');
var router = express.Router();
var stormpath = require('stormpath');

/* GET home page. */
router.get('/routes', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
