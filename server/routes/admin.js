'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');

var adminAppRoot = path.join(config.clientRoot, 'app', 'admin');
var adminPage = path.join(adminAppRoot, 'admin.html');

router.post('/createCategory', function (req, res) {
    models.Category.findOrCreate({where: req.body.category})
        .spread(function (category, created) {
            if (!created) {
                res.statusCode = 409;
            }
            res.sendFile(adminPage);
        })
});

router.post('/createProduct', function (req, res) {
    var product = req.body.product;
    models.Category.findOne({where: {name: product.categoryName}})
        .then(function (category) {
            if (category === null) {
                res.statusCode = 404;
                res.sendFile(adminPage);
            } else {
                models.Product.findOrCreate({
                        where: {
                            name: product.name
                        },
                        defaults: {
                            price: product.price,
                            categoryId: category.categoryId
                        }
                    })
                    .spread(function (product, created) {
                        if (!created) {
                            res.statusCode = 409;
                        }
                        res.sendFile(adminPage);
                    })
            }
        });
});

module.exports = router;
