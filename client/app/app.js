'use strict';

angular.module('supermarketApp', [
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/pagenotfound');

        $httpProvider.defaults.headers.get = {'Content-Type': 'application/json'};
        $httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });