'use strict';

angular.module('supermarketApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: '/app/login/login.html',
                controller: 'LoginController'
            });
    });