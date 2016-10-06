'use strict';

angular.module('supermarketApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/app/home/home.html',
                controller: 'HomeController'
            });
    });