'use strict';

var express = require('express');
var path = require('path');
var config = require('../config/config.js');
var router = express.Router();
var models = require('../models/models');
var passport = require('../config/passport');

var homeAppRoot = path.join(config.clientRoot, 'app', 'home');
var homePage = path.join(homeAppRoot, 'home.html');

router.post('/buy', passport.userOnly, function (req, res) {
    var cart = req.body.cart;
    models.Bill.create({userName: req.user.userName})
        .then(function (bill) {
            for (var productId in cart) {
                var product = cart[productId];
                models.BillElement.create({
                    billId: bill.billId,
                    productId: product.productId,
                    count: product.quantity,
                    price: product.price
                })
            }
            res.sendStatus(200);
        })
});

router.get('/search', function (req, res) {
    var searchString = req.query.searchField;
    models.Product.findAll({where: {name: {$like: '%' + searchString + '%'}}})
        .then(function (products) {
            models.Category.findAll({
                    where: {
                        categoryId: products.map(function (product) {
                            return product.categoryId;
                        })
                    }
                })
                .then(function (categories) {
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

module.exports = router;