'use strict';

angular.module('supermarketApp', [
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/pagenotfound');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });