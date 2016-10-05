'use strict';

angular.module('supermarketApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('pagenotfound', {
                url: '/pagenotfound',
                templateUrl: 'app/pagenotfound/pagenotfound.html',
                controller: 'PageNotFoundController'
            });
    });