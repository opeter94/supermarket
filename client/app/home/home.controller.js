'use strict';

angular.module('supermarketApp')
    .controller('HomeController', function ($scope, auth) {
        auth.initialize();
    });