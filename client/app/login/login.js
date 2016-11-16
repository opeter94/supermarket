'use strict';

angular.module('supermarketApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/app/login/login.html'
            });
    });