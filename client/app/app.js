'use strict';

angular.module('supermarketApp', [
    //'ngCookies',
    //'ngResource',
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //$urlRouterProvider
        //    .otherwise('/');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });