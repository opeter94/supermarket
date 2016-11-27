'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');
var passport = require('../config/passport');

var adminAppRoot = path.join(config.clientRoot, 'app', 'admin');
var adminPage = path.join(adminAppRoot, 'admin.html');

router.get('/getCategoriesWithProducts', function (req, res) {
    models.Category.findAll()
        .then(function (categories) {
            models.Product.findAll()
                .then(function (products) {
                    var categoriesWithProducts = [];
                    categories.forEach(function (category) {
                        var categoryObject = category.toJSON();
                        categoryObject.products = [];
                        products.forEach(function (product) {
                            if (category.categoryId === product.categoryId) {
                                categoryObject.products.push(product.toJSON());
                            }
                        });
                        categoriesWithProducts.push(categoryObject);
                    });
                    res.status(200).json(categoriesWithProducts);
                });
        })
});

router.post('/createCategory', passport.adminOnly, function (req, res) {
    models.Category.findOrCreate({where: req.body.category})
        .spread(function (category, created) {
            if (!created) {
                res.statusCode = 409;
            }
            res.sendFile(adminPage);
        })
});

router.post('/createProduct', passport.adminOnly, function (req, res) {
    var product = req.body.product;
    models.Category.findOne({where: {name: product.category.name}})
        .then(function (category) {
            models.Product.findOrCreate({
                    where: {
                        name: product.name
                    },
                    defaults: {
                        price: product.price,
                        categoryId: category.categoryId,
                        unit: product.unit
                    }
                })
                .spread(function (product, created) {
                    if (!created) {
                        res.statusCode = 409;
                    }
                    res.sendFile(adminPage);
                })
        });
});

router.post('/editCategory', passport.adminOnly, function (req, res) {
    var newCategoryName = req.body.category.name;
    models.Category.update(
        {name: newCategoryName},
        {where: {categoryId: req.body.category.categoryId}}
        )
        .then(function (result) {
            res.sendFile(adminPage);
        }, function (rejectedPromiseError) {
            res.statusCode = 409;
            res.sendFile(adminPage);
        });
});

router.post('/editProduct', passport.adminOnly, function (req, res) {
    var editedProduct = req.body.product;
    models.Product.update(
        {
            name: editedProduct.name,
            price: editedProduct.price,
            unit: editedProduct.unit,
            categoryId: editedProduct.category.categoryId
        },
        {where: {productId: editedProduct.productId}}
        )
        .then(function (result) {
            res.sendFile(adminPage);
        }, function (rejectedPromiseError) {
            res.statusCode = 409;
            res.sendFile(adminPage);
        });
});

module.exports = router;
