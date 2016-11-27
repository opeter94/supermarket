'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');
var passport = require('../config/passport');

var profileAppRoot = path.join(config.clientRoot, 'app', 'profile');
var profilePage = path.join(profileAppRoot, 'profile.html');

router.get('/getUser', passport.userOnly, function (req, res) {
    req.user.password = null;
    res.status(200).json(req.user);
});

router.post('/editUser', passport.userOnly, function (req, res) {
    var editedUser = req.body.user;
    models.User.update(
        {
            firstName: editedUser.firstName,
            lastName: editedUser.lastName,
            email: editedUser.email,
            cityId: editedUser.cityId,
            address: editedUser.address
        },
        {where: {userName: editedUser.userName}}
        )
        .then(function (result) {
            res.sendFile(profilePage);
        }, function (rejectedPromiseError) {
            res.sendFile(profilePage);
        });
});

router.post('/editPassword', passport.userOnly, function (req, res) {
    var editedPassword = req.body.user.password;
    models.User.update(
        {
            password: editedPassword
        },
        {where: {userName: req.body.user.userName}}
        )
        .then(function (result) {
            res.sendFile(profilePage);
        }, function (rejectedPromiseError) {
            res.sendFile(profilePage);
        });
});

module.exports = router;
