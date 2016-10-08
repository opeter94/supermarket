'use strict';

angular.module('supermarketApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: '/app/register/register.html',
                controller: 'RegisterController'
            });
    });