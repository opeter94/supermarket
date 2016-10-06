'use strict';

angular.module('supermarketApp', [
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/pagenotfound');
        //$urlRouterProvider.otherwise(function($injector) {
        //    var $state = $injector.get('$state');
        //    console.log($state.current);
        //    if ($state.current.name !== 'pagenotfound') {
        //        $state.go('pagenotfound');
        //    }
        //});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });